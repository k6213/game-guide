import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { setUser } = useUser(); // ✅ 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            console.log("서버 로그인 응답:", data);

            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                setUser(data.user); // ✅ 로그인 성공 시 user 저장!
                setMessage("로그인 성공! 잠시 후 이동합니다.");
                setTimeout(() => navigate("/"), 1500);
            } else {
                setMessage(data.error || "로그인 실패");
            }
        } catch (err) {
            setMessage("서버 연결 실패");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">로그인</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">아이디</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="아이디 입력"
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
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded transition"
                    >
                        로그인
                    </button>
                    {message && <div className="text-center text-sm mt-3 text-yellow-400">{message}</div>}
                </form>
                <p className="mt-6 text-sm text-center text-gray-400">
                    아직 계정이 없으신가요?{" "}
                    <Link to="/signup" className="text-yellow-400 hover:underline">
                        회원가입
                    </Link>
                </p>
            </div>
        </div>
    );
}

