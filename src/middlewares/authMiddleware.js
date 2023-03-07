const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        console.log(`[authMiddleware] Erorr in validating token`, err);
        return res.status(401).json({ message: 'Authentication token invalid' });
    }
};

module.exports = {
    authMiddleware
}