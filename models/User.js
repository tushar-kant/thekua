const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    otpRequests: [
        {
            requestedAt: { type: Date, default: Date.now },
        },
    ],
    authenticated: { type: Boolean, default: false },
});

UserSchema.methods.isOtpValid = function (otp) {
    return this.otp === otp && this.otpExpiresAt > Date.now();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
