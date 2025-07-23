const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    phone: { type: String, unique: true, sparse: true },      // 전화번호(옵션, unique)
    phoneVerified: { type: Boolean, default: false },         // 전화번호 인증 여부
    phoneVerificationCode: { type: String },                  // 인증코드(임시 저장)
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);

