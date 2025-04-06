import userModel from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

export const registerUser = async (req,res)=>{
    const {name, username, email, password, phone} = req.body
    if(!name || !username || !password || !email || !phone){
        return res.json({success:false, message:"Please enter all fields..."})
    }
    try {
          // Validate email format
    if (!validator.isEmail(email)) {
        return res.json({
          success: false,
          message: "Please Provide a Valid Email",
        });
      }
      if (password.length < 8) {
        return res.json({
          success: false,
          message: "Your password must contain at least 8 characters",
        });
      }
        // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    // Prepare user data
    const user = {
      name,
      username,
      email,
      password: hashedPassword,
      phone,
      verifyOtp: otp,
      verifyOtpExpireAt: new Date(Date.now() + 5 * 60 * 1000), // OTP valid for 5 minutes
      isAccountVerified: false,
    };

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Account Verification OTP",
        html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email),
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "OTP sent to your email for verification" });
   

  
    } catch (error) {
        console.log(error);
    res.json({ success: false, message: error.message });
        
    }
}

// Verify Email
export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const {id} = req.params;

    if (!id || !otp) {
        try {
            const user = await userModel.findById(id);
            if (user) {
                await userModel.findByIdAndDelete(id); // Remove user if OTP is not provided
            }
        } catch (error) {
            console.error("Error removing user:", error);
        }
        return res.json({ success: false, message: "Missing OTP. User has been removed." });
    }

    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        if (user.verifyOtp !== otp || new Date(user.verifyOtpExpireAt) < new Date()) {
            await userModel.findByIdAndDelete(id); // Remove user for invalid or expired OTP
            return res.json({ success: false, message: "Invalid or expired OTP. User has been removed." });
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = null;

        await user.save();
        return res.json({ success: true, message: "Email verified successfully." });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Server error. Please try again later." });
    }
};

// Login for user

export const loginUser = async (req, res) => {
    const { identifier, password } = req.body;
  
    // Input validation
    if (!identifier || !password) {
      return res.json({ success: false, message: "Email/Username and Password are required" });
    }
  
    try {
      // Check if identifier is an email
      const query = validator.isEmail(identifier)
        ? { email: identifier }
        : { username: identifier };
  
      const user = await userModel.findOne(query);
      if (!user) {
        return res.json({ success: false, message: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      });
  
      return res.json({ success: true, message: "Logged in successfully" });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Server error. Please try again." });
    }
  };

  // Logout user
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        res.json({ success: false, message: error.message });
        console.log(error);
    }
};

// check user is authenticated
export const isAuthenticated = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findById(id);
        if(!user){
            return res.json({success: false, message: "User not found"});
        }
        if(!user.isAccountVerified){
            await userModel.findByIdAndDelete(id);
        }
        return res.json({success: true})
    } catch (error) {
        res.json({ success: false, message: error.message });
        console.log(error);  
    }
}


// send password reset otp

export const sendResetOtp = async (req, res) => {
    const {email} = req.body
    if(!email){
        return res.json({ success: false, message: "Email is required." });
    }

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({ success: false, message: "User not found." }); 
        }

        const otp = String(Math.floor(100000+Math.random()*900000))
       user.resetOtp = otp
       user.resetOtpExpireAt = Date.now() + 5*1000*60
       await user.save()

       const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "RESET PASSWORD OTP",
        // text: `Your otp is ${otp}. Reset your account using this otp.`,
        html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
    }
    await transporter.sendMail(mailOptions)

    return res.json({success:true, message: "Otp is sent to your email"})
         

    } catch (error) {
        res.json({ success: false, message: error.message });
        console.log(error);  
    }
}

// reset user password
export const resetPassword = async (req, res) => {
    const {email,otp,newPassword} = req.body
    if(!email || !otp || !newPassword){
        return res.json({success:false , message:"Email, Otp and New Password are required."})
    }
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({ success: false, message: "User not found." }); 
        }
        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({ success: false, message: "Invalid Otp." });
        }
        if(user.resetOtpExpireAt < Date.now()){
            return res.json({ success: false, message: "Otp Expired." });
        }

        const hashedPassword = await bcrypt.hash(newPassword,10)
        user.password = hashedPassword
        user.resetOtp = ''
        user.resetOtpExpireAt = 0

        await user.save()
        return res.json({success:true, message: "Password has been reset successfully."})

    } catch (error) {
        res.json({ success: false, message: error.message });
        console.log(error);  
    }
}
  
