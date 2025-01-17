const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorised user!",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role
        };

        next();
    } catch (e) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!",
        });
    }
}

module.exports = auth;