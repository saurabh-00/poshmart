const jwt = require('jsonwebtoken');
require('dotenv').config();

const createJwt = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
}

const auth = async (req, res, next) => {
    try {
        // const token = req.cookies.token;
        let token = req.header("Authorization");

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        
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

const withRole = (ArrayRoles) => (req, res, next) => {
    const { user } = req
    if (!user) {
        return res.status(401).json({ error: 'Unauthorised user!' });
    }
    if (!user.role) {
        return res.status(403).json({ error: 'Forbidden!' });
    }
    if (ArrayRoles.includes(user.role)) {
        return next();
    }
    return res.status(403).json({ error: 'Forbidden user!' });
};

module.exports = { createJwt, auth, withRole };