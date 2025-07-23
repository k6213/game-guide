import { useEffect, useState } from "react";
import { getGameRanking } from "@/lib/getGameRanking";
import { Link } from "react-router-dom";

const genres = [
    { name: "전체", id: "" },
    { name: "액션", id: 4 },
    { name: "RPG", id: 5 },
    { name: "인디", id: 51 },
    { name: "시뮬레이션", id: 14 },
    { name: "전략", id: 10 },
];

const categories = [
    "최고 인기 게임",
    "신규 출시 게임",
    "출시 예정",
    "VR 게임",
    "컨트롤러 지원"
];

const today = new Date().toISOString().slice(0, 10);

const categoryParamMap = {
    "최고 인기 게임": { ordering: "-rating" },
    "신규 출시 게임": { ordering: "-released" },
    "출시 예정": { ordering: "released", dates: `${today},2099-12-31` },
    "VR 게임": { tags: "vr" },
    "컨트롤러 지원": { tags: "controller-support" },
};

export default function GameRankingPage() {
    const [games, setGames] = useState([]);
    const [genre, setGenre] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [category, setCategory] = useState(categories[0]);

    const params = categoryParamMap[category] || {};

    const fetchGames = async (reset = false) => {
        setLoading(true);
        const newGames = await getGameRanking({
            genreId: genre,
            page: reset ? 1 : page,
            ...params,
        });
        setGames(prev => reset ? newGames : [...prev, ...newGames]);
        setHasMore(newGames.length > 0);
        setLoading(false);
    };

    useEffect(() => {
        setPage(1);
        setGames([]);
        fetchGames(true);
        // eslint-disable-next-line
    }, [genre, category]);

    useEffect(() => {
        if (page > 1) fetchGames();
        // eslint-disable-next-line
    }, [page]);

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-6">
            <div className="max-w-7xl mx-auto flex gap-8">
                <aside className="w-56 flex-shrink-0 hidden md:block">
                    <h2 className="text-lg font-bold text-yellow-400 mb-4">🎯 장르별 검색</h2>
                    <div className="flex flex-col gap-2 mb-6">
                        {genres.map((g) => (
                            <button
                                key={g.id}
                                onClick={() => setGenre(g.id)}
                                className={`text-left px-3 py-2 rounded-md text-sm transition 
                                    ${genre === g.id
                                        ? "bg-yellow-400 text-black font-bold"
                                        : "text-gray-300 hover:bg-gray-800"
                                    }`}
                            >
                                {g.name}
                            </button>
                        ))}
                    </div>

                    <h2 className="text-lg font-bold text-yellow-400 mb-4">📁 카테고리</h2>
                    <ul className="flex flex-col gap-1 text-sm text-gray-400">
                        {categories.map((c) => (
                            <li
                                key={c}
                                onClick={() => setCategory(c)}
                                className={`
                                    hover:text-yellow-400 cursor-pointer px-3 py-1 rounded hover:bg-gray-800
                                    ${category === c ? "bg-yellow-400 text-black font-bold" : ""}
                                `}
                            >
                                {c}
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="flex-1">
                    <h1 className="text-3xl font-extrabold text-yellow-400 mb-8">
                        🎮 {category}
                    </h1>

                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {games.map((game, index) => (
                            <Link
                                key={game.id}
                                to={`/games/${game.id}`}
                                className="block bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-yellow-500/30 hover:ring-2 hover:ring-yellow-400 no-underline"
                            >
                                <div className="relative">
                                    <img
                                        src={game.background_image}
                                        alt={game.name}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-1">{game.name}</h2>
                                    <p className="text-sm text-gray-300">
                                        ⭐ 평점: {game.rating} / 🗳️ 리뷰 수: {game.ratings_count?.toLocaleString()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </section>

                    {hasMore && (
                        <div className="text-center mt-12">
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={loading}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded shadow transition"
                            >
                                {loading ? "로딩 중..." : "더보기"}
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
