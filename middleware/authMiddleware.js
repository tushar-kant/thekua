// middleware/authMiddleware.js

const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
    const { email } = req.body; // You may use headers or tokens for more secure auth in production
    try {
        const user = await User.findOne({ email });
        if (!user || !user.authenticated) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = authenticateUser;
