const crypto = require('crypto');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
};
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, 'your_jwt_secret', { expiresIn: '1h' });
};
const requestOtp = async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ email });
        }

        const currentTime = new Date();
        user.otpRequests = user.otpRequests.filter(
            (request) => currentTime - request.requestedAt <= 15 * 60 * 1000
        );

        if (user.otpRequests.length >= 3) {
            return res.status(429).json({
                message: 'Too many OTP requests. Please try again after 15 minutes.',
            });
        }

        const otp = generateOtp();
        user.otp = otp;
        user.otpExpiresAt = new Date(currentTime.getTime() + 5 * 60000); // 5 minutes from now
        user.otpRequests.push({});

        await user.save();


        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || !user.isOtpValid(otp)) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.authenticated = true;
        await user.save();

        const token = generateToken(user._id);

        return res.status(200).json({ message: 'OTP verified successfully', token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { requestOtp, verifyOtp };
