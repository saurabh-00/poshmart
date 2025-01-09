const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register 
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({
                success: false,
                message: "User already exists with the same email! Please try again",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Registration successful"
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || 'Something bad happened'
        });
    }
}

// Login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exists! Please register first",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({
                success: false,
                message: "Incorrect password! Please try again",
            });
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        return res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "PROD",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }).json({
            success: true,
            message: "Logged in successfully",
            user: {
                email: user.email,
                role: user.role,
                id: user.id,
                username: user.username,
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Something bad happened"
        });
    }
}

// Logout
const logoutUser = (req, res) => {
    return res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully!",
    });
}

module.exports = { registerUser, loginUser, logoutUser };