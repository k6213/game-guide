import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react"; // lucide-react 설치 필요 (npm i lucide-react)

// .env의 API 주소 가져오기
const API_BASE = import.meta.env.VITE_API_URL;

export default function HomePage() {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");

    // 공략 목록 불러오기(인기 or 검색)
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

    // 처음에는 인기 공략만
    useEffect(() => {
        fetchGuides();
    }, []);

    // 검색 submit
    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(searchInput);
        fetchGuides(searchInput);
    };

    // 입력창 비우면 다시 인기공략
    useEffect(() => {
        if (searchInput === "") {
            fetchGuides("");
        }
        // eslint-disable-next-line
    }, [searchInput]);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col">
            {/* Hero (비디오+텍스트) */}
            <section className="relative h-[400px] md:h-[520px] flex items-center justify-center overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/Standard_Mode_Aerial_view_of_the_city_with_fly.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                        모두의 공략집
                    </h1>
                    <p className="text-lg mb-8 drop-shadow">
                        AI가 생성한 최신 게임 공략 모음
                    </p>
                    <Link to="/create">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded shadow-lg">
                            지금 바로 시작하기
                        </button>
                    </Link>
                </div>
            </section>

            {/* 인기 공략/검색 결과 섹션 */}
            <section className="relative z-10 bg-gray-900 py-16 px-6 flex-1">
                <h2 className="text-3xl font-bold text-center mb-10">
                    {query ? `🔍 "${query}" 검색 결과` : "🔥 인기 공략 모음"}
                </h2>
                {/* 검색창 */}
                <form
                    className="relative max-w-xl mx-auto mt-4 mb-12 px-4 flex"
                    onSubmit={handleSearch}
                >
                    <input
                        type="text"
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder="찾고 싶은 공략을 검색하세요..."
                        className="w-full px-5 py-3 rounded-l-2xl bg-gray-800 text-white placeholder-gray-400 border-t border-b border-l border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                        type="submit"
                        className={`
                            flex items-center gap-2 px-6 py-3
                            text-lg font-bold
                            rounded-r-2xl
                            bg-gradient-to-r from-yellow-400 to-yellow-600
                            text-black shadow-lg
                            transition
                            hover:scale-105 hover:from-yellow-500 hover:to-yellow-700
                            focus:outline-none
                            h-[48px]   // 버튼 높이 고정! (입력창 높이와 맞추기)
                        `}
                    >
                        <Search size={20} className="inline" />
                        <span className="whitespace-nowrap">검색</span>
                    </button>
                </form>
                {/* 로딩 or 데이터 */}
                {loading ? (
                    <div className="text-center text-gray-400">로딩 중...</div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        {guides.length === 0 ? (
                            <div className="col-span-3 text-center text-gray-500">
                                {query
                                    ? "검색 결과가 없습니다."
                                    : "인기 공략이 없습니다."
                                }
                            </div>
                        ) : (
                            guides.map((guide) => (
                                <div
                                    key={guide._id || guide.id}
                                    className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition"
                                >
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">
                                            {guide.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm">{guide.summary}</p>
                                        <div className="flex items-center gap-2 mt-2 text-yellow-400 text-xs">
                                            👍 {guide.likes || 0} 좋아요
                                        </div>
                                        <Link
                                            to={`/guide/${guide._id || guide.id}`}
                                            className="inline-block mt-4 text-yellow-400 hover:underline text-sm"
                                        >
                                            자세히 보기 →
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
