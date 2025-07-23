import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

export default function Header() {
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    // 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <Link to="/" className="flex items-center space-x-3 no-underline hover:no-underline">
                    <img
                        src="/rogo.png"
                        alt="Game Guide"
                        className="h-10 w-10 rounded-full shadow-md"
                    />
                    <span className="text-2xl font-bold tracking-wide hover:text-yellow-400 transition-colors">
                        Game Guide
                    </span>
                </Link>

                <nav className="hidden md:flex space-x-6 text-sm font-medium">
                    {[
                        { name: "홈", path: "/" },
                        { name: "게임종류", path: "/rankings" },
                        { name: "공략 모음", path: "/guides" },
                        { name: "공략 작성", path: "/create" },
                        { name: "고객지원", path: "/support" },
                        // 👇 여기! 로그인시만 "마이공략집"
                        ...(user ? [{ name: "마이공략집", path: "/my-guides" }] : []),
                    ].map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="no-underline hover:no-underline text-white hover:text-yellow-400 transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* ✅ 로그인 상태에 따라 버튼 분기 */}
                {user ? (
                    <div className="flex items-center space-x-3">
                        <span className="text-yellow-400 font-bold">{user.username} 님</span>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-md shadow transition"
                        >
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md shadow transition"
                    >
                        로그인
                    </button>
                )}
            </div>
        </header>
    );
}



