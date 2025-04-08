import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login again" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // You can optionally check the ID or attach admin to req:
    req.adminId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authAdmin;
