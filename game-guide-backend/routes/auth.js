const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "changeme-secret!";

// 회원가입
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "정보 누락" });

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: "이미 사용중인 아이디입니다." });

    // 비밀번호 해싱!
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();

    res.json({ ok: true, msg: "회원가입 성공" });
});

// 로그인
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "정보 누락" });

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ error: "아이디 또는 비밀번호가 일치하지 않습니다." });
    }

    // 해싱된 비번과 비교!
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: "아이디 또는 비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign(
        { username: user.username },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({ ok: true, user: { username: user.username }, token });
});

module.exports = router;
