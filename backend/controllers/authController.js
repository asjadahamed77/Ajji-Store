import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import transporter from "../config/nodemailer.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from "../config/emailTemplates.js";

// REGISTER - Send OTP only
export const registerUser = async (req, res) => {
  const { name, username, email, password, phone } = req.body;

  if (!name || !username || !email || !password || !phone) {
    return res.json({ success: false, message: "Please enter all fields" });
  }

  if (!validator.isEmail(email)) {
    return res.json({
      success: false,
      message: "Please provide a valid email",
    });
  }

  if (password.length < 8) {
    return res.json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Email or Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    const user = new userModel({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
      verifyOtp: otp,
      verifyOtpExpireAt: new Date(Date.now() + 5 * 60 * 1000), // OTP valid for 5 minutes
      isAccountVerified: false,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });
    // Send OTP email

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Account Verification OTP",
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        email
      ),
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent to your email", token, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Registration failed" });
  }
};

// VERIFY - Save user to DB
export const verifyEmail = async (req, res) => {
  const { otp, id } = req.body;


  if (!id || !otp) {
    try {
      const user = await userModel.findById(id);
      if (user) {
        await userModel.findByIdAndDelete(id);
      }
    } catch (error) {
      console.error("Error removing user:", error);
    }
    return res.json({
      success: false,
      message: "Missing OTP. User has been removed.",
    });
  }

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    if (
      user.verifyOtp !== otp ||
      new Date(user.verifyOtpExpireAt) < new Date()
    ) {
      await userModel.findByIdAndDelete(id); // Remove user for invalid or expired OTP
      return res.json({
        success: false,
        message: "Invalid or expired OTP. User has been removed.",
      });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = null;

    await user.save();
    return res.json({ success: true, message: "Email verified successfully.", user });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.json({
      success: false,
      message: "Email/Username and password required",
    });
  }

  try {
    const query = validator.isEmail(identifier)
      ? { email: identifier }
      : { username: identifier };
    const user = await userModel.findOne(query);
    if (!user)
      return res.json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
      },
      token
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Login failed" });
  }
};

// LOGOUT
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// IS AUTHENTICATED
export const isAuthenticated = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) return res.json({ success: false, message: "User not found" });

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Authentication check failed" });
  }
};

// SEND RESET OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: "Email is required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 5 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "RESET PASSWORD OTP",
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        email
      ),
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to send OTP" });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.resetOtp !== otp || user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpireAt = null;
    await user.save();

    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to reset password" });
  }
};
