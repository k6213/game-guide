import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useTranslation } from "react-i18next";

export default function Header() {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const { i18n } = useTranslation();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };
    const handleLang = (lng) => i18n.changeLanguage(lng);

    const menuItems = [
        { name: "홈", path: "/" },
        { name: "게임종류", path: "/rankings" },
        { name: "공략 모음", path: "/guides" },
        { name: "공략 작성", path: "/create" },
        { name: "고객지원", path: "/support" },
        ...(user ? [{ name: "마이공략집", path: "/my-guides" }] : []),
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
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
                {/* 햄버거 버튼 (모바일) */}
                <button
                    className="md:hidden p-2 focus:outline-none"
                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                    aria-label="메뉴 열기"
                >
                    <svg className="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                {/* 데스크탑 네비 */}
                <nav className="hidden md:flex space-x-6 text-sm font-medium">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="no-underline hover:no-underline text-white hover:text-yellow-400 transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                {/* 로그인/언어 전환 */}
                <div className="flex items-center space-x-3">
                    <div className="flex items-center gap-1 mr-2">
                        <button
                            onClick={() => handleLang('ko')}
                            className={`px-2 py-1 rounded ${i18n.language === 'ko' ? 'bg-yellow-400 text-black font-bold' : 'text-gray-300'}`}
                        >
                            한글
                        </button>
                        <span className="text-gray-500">|</span>
                        <button
                            onClick={() => handleLang('en')}
                            className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-yellow-400 text-black font-bold' : 'text-gray-300'}`}
                        >
                            EN
                        </button>
                    </div>
                    {user ? (
                        <>
                            <span className="text-yellow-400 font-bold">{user.username} 님</span>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-md shadow transition"
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md shadow transition"
                        >
                            로그인
                        </button>
                    )}
                </div>
            </div>
            {/* 모바일 네비 */}
            {mobileNavOpen && (
                <div className="md:hidden bg-gray-900 border-t border-gray-800 shadow-lg absolute w-full left-0 top-[72px] z-50 animate-fade-in">
                    <nav className="flex flex-col space-y-2 px-6 py-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileNavOpen(false)}
                                className="block py-2 text-lg font-semibold text-white hover:text-yellow-400 transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
