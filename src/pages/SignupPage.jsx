import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// .env 환경변수에서 API 베이스 URL 읽기
const API_BASE = import.meta.env.VITE_API_URL;

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (password !== passwordConfirm) {
            setMessage("비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            // 배포환경/개발환경 모두 지원
            const res = await fetch(`${API_BASE}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("회원가입 성공! 로그인 해주세요.");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setMessage(data.error || "회원가입 실패");
            }
        } catch (err) {
            setMessage("서버 연결 실패");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">회원가입</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">아이디</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="아이디(영문/숫자)"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">비밀번호</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">비밀번호 확인</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="비밀번호 다시 입력"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded transition"
                    >
                        회원가입
                    </button>
                    {message && (
                        <div className="text-center text-sm mt-3 text-yellow-400">{message}</div>
                    )}
                </form>
                <p className="mt-6 text-sm text-center text-gray-400">
                    이미 계정이 있으신가요?{" "}
                    <Link to="/login" className="text-yellow-400 hover:underline">
                        로그인
                    </Link>
                </p>
            </div>
        </div>
    );
}
