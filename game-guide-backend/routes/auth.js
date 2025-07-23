const express = require("express");
const User = require("../models/User");
const router = express.Router();

// --- Twilio 및 전화번호 인증 관련 코드 전부 제거 ---

// 회원가입 (POST /api/auth/register)
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "정보 누락" });

    // 아이디 중복 체크
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: "이미 사용중인 아이디입니다." });

    // (실전에서는 비밀번호를 반드시 해시해서 저장하세요)
    const user = new User({ username, password });
    await user.save();

    res.json({ ok: true, msg: "회원가입 성공" });
});

module.exports = router;
