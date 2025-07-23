const express = require("express");
const Guide = require("../models/Guide");
const auth = require("../middleware/auth");
const router = express.Router();

// ✅ 좋아요순 인기 공략 상위 3개
router.get("/popular", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 3;
        // likes가 많은 순으로 정렬 (최신순이 아니라 인기순!)
        const guides = await Guide.find().sort({ likes: -1, _id: -1 }).limit(limit);
        res.json({ guides });
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});


// ✅ 공략 검색 (좋아요순, limit 기본 3)
router.get("/search", async (req, res) => {
    const { query = "", limit = 3 } = req.query;
    if (!query.trim()) return res.json({ guides: [] });

    // 대소문자 구분 없이 제목, summary, 본문에서 검색
    const regex = new RegExp(query, "i");
    try {
        const guides = await Guide.find({
            $or: [
                { title: regex },
                { summary: regex },
                { full: regex }
            ]
        })
            .sort({ likes: -1, _id: -1 })
            .limit(Number(limit));
        res.json({ guides });
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});


// ✅ 전체 목록 (내글만 보기: /api/guides?author=닉네임)
router.get("/", async (req, res) => {
    try {
        const { author } = req.query;
        const filter = author ? { author } : {};
        const guides = await Guide.find(filter).sort({ _id: -1 }).limit(30);
        res.json(guides);
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});

// ✅ 작성 (로그인 필요)
router.post("/", auth, async (req, res) => {
    const { title, summary, full, game, imageUrl } = req.body;
    if (!title || !summary || !full || !game) {
        return res.status(400).json({ error: "필수 항목 누락" });
    }
    try {
        const guide = new Guide({
            title, summary, full, game, imageUrl, author: req.user.username
        });
        await guide.save();
        res.status(201).json(guide);
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});

// ✅ 상세 조회
router.get("/:id", async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) return res.status(404).json({ error: "존재하지 않는 글" });
        res.json(guide);
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});

// ✅ 수정 (PUT /api/guides/:id)
router.put("/:id", auth, async (req, res) => {
    const { title, summary, full, game, imageUrl } = req.body;
    if (!title || !summary || !full || !game) {
        return res.status(400).json({ error: "필수 항목 누락" });
    }
    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) return res.status(404).json({ error: "글이 존재하지 않습니다." });
        if (guide.author !== req.user.username) {
            return res.status(403).json({ error: "수정 권한 없음" });
        }
        guide.title = title;
        guide.summary = summary;
        guide.full = full;
        guide.game = game;
        guide.imageUrl = imageUrl;
        await guide.save();
        res.json({ ok: true, guide });
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});

// ✅ 삭제 (DELETE /api/guides/:id)
router.delete("/:id", auth, async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) return res.status(404).json({ error: "글이 존재하지 않습니다." });
        if (guide.author !== req.user.username) {
            return res.status(403).json({ error: "삭제 권한 없음" });
        }
        await guide.deleteOne();
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});

// 좋아요 토글 (POST /api/guides/:id/like)
router.post("/:id/like", auth, async (req, res) => {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ error: "존재하지 않는 글" });

    // 로그인 유저 기준 중복 좋아요 방지 (간단 버전)
    const userId = req.user.username;
    const alreadyLiked = guide.likedUsers?.includes(userId);
    if (alreadyLiked) {
        // 좋아요 취소
        guide.likedUsers = guide.likedUsers.filter(u => u !== userId);
        guide.likes = Math.max(0, guide.likes - 1);
    } else {
        // 좋아요 추가
        guide.likedUsers = [...(guide.likedUsers || []), userId];
        guide.likes = (guide.likes || 0) + 1;
    }
    await guide.save();
    res.json({ ok: true, likes: guide.likes });
});

// 댓글 추가
router.post("/:id/comments", auth, async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "댓글 내용 누락" });

    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) return res.status(404).json({ error: "존재하지 않는 글" });

        // 댓글 객체 생성
        const comment = {
            user: req.user.username,
            text,
            createdAt: new Date().toISOString(),
        };

        // 맨 뒤에 추가
        guide.comments.push(comment);
        await guide.save();

        res.json({ ok: true, comments: guide.comments });
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});

// 댓글 삭제
router.delete("/:id/comments/:commentIdx", auth, async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) return res.status(404).json({ error: "존재하지 않는 글" });

        const idx = parseInt(req.params.commentIdx, 10);
        const comment = guide.comments[idx];
        if (!comment) return res.status(404).json({ error: "존재하지 않는 댓글" });

        // 본인만 삭제 가능
        if (comment.user !== req.user.username) {
            return res.status(403).json({ error: "삭제 권한 없음" });
        }

        // 배열에서 삭제
        guide.comments.splice(idx, 1);
        await guide.save();

        res.json({ ok: true, comments: guide.comments });
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});




module.exports = router;
