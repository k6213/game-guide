import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 환경변수에서 API 베이스 URL 읽기
const API_BASE = import.meta.env.VITE_API_URL;

export default function GuideListPage() {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 서버에서 최신 공략글 목록 fetch
        fetch(`${API_BASE}/api/guides`)
            .then(res => res.json())
            .then(data => {
                setGuides(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-white">
            불러오는 중...
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 pt-28 pb-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-10">📘 최신 공략 리스트</h1>
                <div className="space-y-6">
                    {guides.length === 0 ? (
                        <div className="text-center text-gray-400">아직 작성된 공략글이 없습니다.</div>
                    ) : (
                        guides.map((guide, idx) => (
                            <Link
                                key={guide._id || idx}
                                to={`/guide/${guide._id || guide.id}`}
                                className="block"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <div
                                    className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300 cursor-pointer"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-400">{guide.game}</span>
                                        <span className="text-sm text-gray-500">{guide.createdAt?.slice(0, 10) || ""}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">{guide.title}</h2>
                                    <p className="text-gray-300">{guide.summary}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}


