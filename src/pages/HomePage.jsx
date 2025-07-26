import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next"; // ⭐️ 추가

const API_BASE = import.meta.env.VITE_API_URL;

export default function HomePage() {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const { t } = useTranslation("homepage"); // ⭐️ namespace 명시!

    // 공략 목록 불러오기
    const fetchGuides = async (keyword = "") => {
        setLoading(true);
        let url = "";
        if (keyword.trim() === "") {
            url = `${API_BASE}/api/guides/popular?limit=3`;
        } else {
            url = `${API_BASE}/api/guides/search?query=${encodeURIComponent(keyword)}&limit=3`;
        }
        try {
            const res = await fetch(url);
            const data = await res.json();
            setGuides(data.guides || []);
        } catch {
            setGuides([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchGuides();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(searchInput);
        fetchGuides(searchInput);
    };

    useEffect(() => {
        if (searchInput === "") {
            fetchGuides("");
        }
    }, [searchInput]);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col">
            {/* Hero */}
            <section className="relative h-[400px] md:h-[520px] flex items-center justify-center overflow-hidden">
                <video
                    autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/Standard_Mode_Aerial_view_of_the_city_with_fly.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                        {t("title")}
                    </h1>
                    <p className="text-lg mb-8 drop-shadow">{t("desc")}</p>
                    <Link to="/create">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded shadow-lg">
                            {t("start")}
                        </button>
                    </Link>
                </div>
            </section>
            {/* 인기 공략/검색 결과 */}
            <section className="relative z-10 bg-gray-900 py-16 px-6 flex-1">
                <h2 className="text-3xl font-bold text-center mb-10">
                    {query ? t("search_result", { query }) : t("popular")}
                </h2>
                {/* 검색창 */}
                <form className="relative max-w-xl mx-auto mt-4 mb-12 px-4 flex" onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder={t("search_placeholder")}
                        className="w-full px-5 py-3 rounded-l-2xl bg-gray-800 text-white placeholder-gray-400 border-t border-b border-l border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 text-lg font-bold rounded-r-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg transition hover:scale-105 hover:from-yellow-500 hover:to-yellow-700 focus:outline-none h-[48px]"
                    >
                        <Search size={20} className="inline" />
                        <span className="whitespace-nowrap">{t("search")}</span>
                    </button>
                </form>
                {/* 로딩 or 데이터 */}
                {loading ? (
                    <div className="text-center text-gray-400">{t("loading")}</div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        {guides.length === 0 ? (
                            <div className="col-span-3 text-center text-gray-500">
                                {query ? t("no_result") : t("no_popular")}
                            </div>
                        ) : (
                            guides.map((guide) => (
                                <Link
                                    key={guide._id || guide.id}
                                    to={`/guides/${guide._id || guide.id}`}
                                    className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition block cursor-pointer"
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                                        <p className="text-gray-300 text-sm">{guide.summary}</p>
                                        <div className="flex items-center gap-2 mt-2 text-yellow-400 text-xs">
                                            👍 {guide.likes || 0} {t("like")}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

