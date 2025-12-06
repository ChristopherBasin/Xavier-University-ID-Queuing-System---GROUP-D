const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function auth(requiredRole) {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;

            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ success: false, message: "Access denied" });
            }

            next();
        } catch {
            res.status(401).json({ success: false, message: "Invalid token" });
        }
    }
}

module.exports = auth;
