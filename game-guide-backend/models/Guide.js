const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
    title: String,
    summary: String,
    game: String,
    author: String,
    full: String,
    createdAt: { type: String, default: () => new Date().toISOString().slice(0, 10) },
    // 좋아요 기능
    likes: { type: Number, default: 0 },
    likedUsers: [{ type: String }],

    // ⭐️ 댓글 기능 추가!
    comments: [
        {
            user: String,              // 댓글 작성자
            text: String,              // 댓글 내용
            createdAt: { type: String, default: () => new Date().toISOString() }
        }
    ]
});

module.exports = mongoose.model("Guide", guideSchema);


