import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") 
    ? authHeader.split(" ")[1] 
    : req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id };
      next();
    } else {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Token expired or invalid" });
  }
};

export default userAuth;
