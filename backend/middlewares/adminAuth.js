import jwt from 'jsonwebtoken'

const authAdmin = async (req, res, next) => {
  try {
    const { admintoken } = req.headers;

    if (!admintoken) {
      res.json({ success: false, message: "Not Authorized Login Again" });
    }
    const decode_token = jwt.verify(admintoken, process.env.JWT_SECRET);
    if (decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      res.json({ success: false, message: "Not Authorized Login Again" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
