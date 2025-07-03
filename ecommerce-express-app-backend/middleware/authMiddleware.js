const jwt = require('jsonwebtoken')

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Access Denied. No Token Provided"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("authorized hahah")
        next();    
    } catch (error) {
        console.log("authMiddleware failed",token)
        res.status(400).json({ error: "Invalid or expired token"})
    }
};

exports.requireAdmin = (req, res, next) => {
    if (req.user.role != 'admin') {
        return res.status(403).json({ error: "Admin access required"});
    }
    next();
}