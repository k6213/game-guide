require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const guideRouter = require("./routes/guides");

const app = express();
app.use(cors());
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
