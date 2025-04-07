import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const admintoken = jwt.sign(email + password, process.env.JWT_SECRET);
        res.json({ success: true, admintoken });
      } else {
        res.json({ success: false, message: "Invalid Credentials" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

 
  