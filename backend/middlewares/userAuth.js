import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.status(401).json({ success: false, message: "Invalid token. Please login again." });
        }

        // Attach user ID to request object (use req.user instead of req.params.id)
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({ success: false, message: "Token verification failed. Please login again." });
    }
};

export default userAuth;
