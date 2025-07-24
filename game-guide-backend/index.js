require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const guideRouter = require("./routes/guides");

const app = express();

// 🚩 CORS 설정 - 개발/배포 모두 지원
const allowedOrigins = [
    "http://localhost:5173",           // 개발용
    "https://game-guide-taupe.vercel.app" // 배포용 (실제 프론트 URL로 변경)
];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB 연결 성공"))
    .catch(err => console.error("❌ MongoDB 연결 실패:", err));

// 라우터 연결
app.use("/api/auth", authRouter);
app.use("/api/guides", guideRouter);

app.listen(4000, () => {
    console.log("✅ 서버 시작 (포트 4000)");
});
