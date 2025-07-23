import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useUser } from "@/contexts/UserContext";

export default function GuideDetailPage() {
    const { id } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");           // 댓글 입력 상태
    const [commentLoading, setCommentLoading] = useState(false);

    // 공략 가져오기
    const fetchGuide = () => {
        fetch(`/api/guides/${id}`)
            .then(res => res.json())
            .then(data => {
                setGuide(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchGuide();
        // eslint-disable-next-line
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-white">불러오는 중...</div>
    );
    if (!guide || guide.error) return (
        <div className="min-h-screen flex items-center justify-center text-white">
            {guide?.error || "존재하지 않는 공략글입니다."}
        </div>
    );

    const showEdit = user && user.username === guide.author;

    // ⭐️ 좋아요 처리
    const handleLike = async () => {
        if (!user) return alert("로그인 필요!");
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/guides/${id}/like`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.ok) fetchGuide();
        else alert(data.error || "실패");
    };

    // ⭐️ 댓글 작성
    const handleComment = async () => {
        if (!comment.trim()) return;
        setCommentLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/guides/${id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ text: comment }),
        });
        setComment("");
        setCommentLoading(false);
        if (res.ok) fetchGuide();
        else alert("댓글 등록 실패");
    };

    // ⭐️ 댓글 삭제
    const handleDeleteComment = async (idx) => {
        const yes = window.confirm("댓글을 삭제할까요?");
        if (!yes) return;
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/guides/${id}/comments/${idx}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) fetchGuide();
        else alert("댓글 삭제 실패");
    };

    // ⭐️ 신고 버튼 (임시)
    const handleReport = () => {
        alert("🚨 신고가 접수되었습니다! (실제 신고 기능은 추가 구현 필요)");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 pt-28 pb-10">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                <Link to="/guides" className="text-yellow-400 hover:underline text-sm mb-6 inline-block">
                    ← 공략 리스트로
                </Link>
                <div className="mb-2 text-gray-400 text-sm flex gap-3">
                    <span>{guide.game}</span>
                    <span>{guide.createdAt?.slice(0, 10)}</span>
                    <span className="text-yellow-400">{guide.author}</span>
                </div>
                <h1 className="text-3xl font-extrabold mb-6 text-yellow-400">{guide.title}</h1>
                <div className="prose prose-invert max-w-none ...">
                    <ReactMarkdown
                        children={guide.full || guide.summary}
                        remarkPlugins={[remarkGfm]}
                    />
                </div>

                {/* ⭐️ 좋아요/신고/수정 버튼 영역 */}
                <div className="flex gap-4 mt-8 items-center">
                    <button
                        onClick={handleLike}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-5 rounded transition"
                    >
                        👍 좋아요 {guide.likes || 0}
                    </button>
                    {showEdit && (
                        <button
                            onClick={() => navigate(`/guides/${guide._id}/edit`)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded transition"
                        >
                            ✏️ 수정
                        </button>
                    )}
                </div>

                {/* ⭐️ 댓글 영역 */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-yellow-400 mb-4">💬 댓글</h2>
                    {user ? (
                        <div className="flex gap-3 mb-6">
                            <input
                                type="text"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder="댓글을 입력하세요"
                                className="flex-1 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                                disabled={commentLoading}
                            />
                            <button
                                onClick={handleComment}
                                disabled={commentLoading}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 rounded"
                            >
                                등록
                            </button>
                        </div>
                    ) : (
                        <div className="text-gray-400 mb-4">댓글 작성은 로그인 필요</div>
                    )}

                    {/* 전체 댓글 리스트 */}
                    <div className="space-y-4">
                        {(guide.comments || []).length === 0 && (
                            <div className="text-gray-500">아직 댓글이 없습니다.</div>
                        )}
                        {(guide.comments || []).map((c, i) => (
                            <div key={i} className="bg-gray-700 rounded px-4 py-3 flex justify-between items-center">
                                <div>
                                    <b className="text-yellow-400">{c.user}</b>
                                    <span className="ml-2">{c.text}</span>
                                    <span className="ml-3 text-xs text-gray-400">{c.createdAt?.slice(0, 16).replace("T", " ")}</span>
                                </div>
                                {user && user.username === c.user && (
                                    <button
                                        className="text-xs text-red-400 hover:underline"
                                        onClick={() => handleDeleteComment(i)}
                                    >
                                        삭제
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}




