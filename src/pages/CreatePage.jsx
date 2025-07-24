import { useState } from "react";
import { getGeminiGuide } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_BASE = import.meta.env.VITE_API_URL;

export default function CreatePage() {
    const [question, setQuestion] = useState("");
    const [game, setGame] = useState("");
    const [guide, setGuide] = useState("");
    const [loading, setLoading] = useState(false);

    const saveGuide = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!game.trim()) {
                alert("게임명을 입력하세요.");
                return;
            }
            if (!guide.trim()) {
                alert("생성된 공략이 없습니다!");
                return;
            }
            const res = await fetch(`${API_BASE}/api/guides`, { // ← 변경!
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: question.slice(0, 20) + "...",
                    summary: guide.slice(0, 60) + "...",
                    full: guide,
                    game: game,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                alert("✅ 공략이 서버에 저장되었습니다!");
            } else {
                alert("❌ 저장 실패: " + (data.error || "서버 오류"));
            }
        } catch (err) {
            alert("❌ 네트워크 오류 (로그인 상태 or 서버 연결 확인)");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        setLoading(true);
        setGuide("");
        try {
            const result = await getGeminiGuide(question);
            setGuide(result);
        } catch (err) {
            console.error("생성 실패:", err);
            setGuide("⚠️ 공략 생성 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 pt-28 pb-16">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8 text-center text-yellow-400">
                    🛠️ 공략 생성하기
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 rounded-lg shadow-lg p-6 mb-10"
                >
                    <label className="block mb-2 text-lg font-semibold">
                        🎮 궁금한 게임 내용을 입력하세요
                    </label>
                    <input
                        type="text"
                        className="w-full mb-4 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="게임명 (예: 엘든링)"
                        value={game}
                        onChange={e => setGame(e.target.value)}
                        required
                    />
                    <textarea
                        className="w-full p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="예: 엘든링 초반 보스 어떻게 잡나요?"
                        value={question}
                        rows={4}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-6 rounded font-bold text-black transition-all duration-200 ${loading
                            ? "bg-yellow-300 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700"
                            }`}
                    >
                        {loading ? "⏳ 공략 생성 중..." : "⚡ 공략 생성"}
                    </button>
                </form>

                {guide && (
                    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-yellow-600">📖 생성된 공략</h2>
                        <div className="prose max-w-none ...">
                            <ReactMarkdown children={guide} remarkPlugins={[remarkGfm]} />
                        </div>
                        <button
                            onClick={saveGuide}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded mt-6 transition-all duration-200"
                        >
                            💾 저장하기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}



