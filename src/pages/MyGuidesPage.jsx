import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

export default function MyGuidesPage() {
    const { user } = useUser();
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`/api/guides?author=${encodeURIComponent(user.username)}`)
                .then(res => res.json())
                .then(setGuides);
        }
    }, [user]);

    // 삭제 처리
    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/guides/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
            setGuides(guides.filter(g => g._id !== id));
        } else {
            alert("삭제 실패");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-28 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-yellow-400">📝 내 공략집</h1>
                <div className="space-y-6">
                    {guides.length === 0 ? (
                        <div className="text-gray-400">작성한 공략이 없습니다.</div>
                    ) : (
                        guides.map((guide) => (
                            <div key={guide._id} className="bg-gray-800 rounded-lg p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <div>
                                    <h2 className="text-xl font-bold">{guide.title}</h2>
                                    <div className="text-gray-400 text-sm mb-2">{guide.game} | {guide.createdAt?.slice(0, 10)}</div>
                                </div>
                                <div className="flex gap-2">
                                    <Link to={`/guides/edit/${guide._id}`}>
                                        <button className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">수정</button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(guide._id)}
                                        className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                                    >삭제</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

