import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// ✅ 환경변수로부터 API키 읽기
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export default function GameDetailPage() {
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then(setGame)
            .catch(console.error);
    }, [id]);

    if (!game) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-xl animate-pulse">⏳ 게임 정보를 불러오는 중...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-28 px-6 pb-20">
            <div className="max-w-5xl mx-auto bg-gray-900/80 backdrop-blur rounded-lg shadow-xl p-6 md:p-10">

                {/* 제목 */}
                <h1 className="text-4xl font-extrabold text-yellow-400 mb-4 text-center">
                    {game.name}
                </h1>

                {/* 대표 이미지 */}
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full max-h-[480px] object-cover rounded-lg mb-8 shadow-md"
                />

                {/* 설명 */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">📝 게임 소개</h2>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {game.description_raw}
                    </p>
                </section>

                {/* 상세 정보 */}
                <section className="grid gap-4 text-sm text-gray-300 md:grid-cols-2">
                    <p>
                        <span className="font-semibold text-white">🎮 플랫폼:</span>{" "}
                        {game.platforms.map(p => p.platform.name).join(", ")}
                    </p>
                    <p>
                        <span className="font-semibold text-white">🧬 장르:</span>{" "}
                        {game.genres.map(g => g.name).join(", ")}
                    </p>
                    <p>
                        <span className="font-semibold text-white">🏢 개발사:</span>{" "}
                        {game.developers?.map(d => d.name).join(", ") || "정보 없음"}
                    </p>
                    <p>
                        <span className="font-semibold text-white">📅 출시일:</span>{" "}
                        {game.released}
                    </p>
                    <p>
                        <span className="font-semibold text-white">⭐ 평점:</span>{" "}
                        {game.rating} / 🗳️ {game.ratings_count.toLocaleString()}
                    </p>
                    <p>
                        <span className="font-semibold text-white">🛒 구매처:</span>{" "}
                        {game.stores && game.stores.length > 0 ? (
                            game.stores.map(s => (
                                <a
                                    key={s.store.id}
                                    href={
                                        s.url ||
                                        (s.store.domain
                                            ? `https://${s.store.domain}/app/${game.slug}`
                                            : "#")
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 underline mr-2"
                                >
                                    {s.store.name}
                                </a>
                            ))
                        ) : (
                            "정보 없음"
                        )}
                    </p>
                </section>
            </div>
        </div>
    );
}

