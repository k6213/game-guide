import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function GuideEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imgFile, setImgFile] = useState(null);
    const imgInput = useRef();

    useEffect(() => {
        fetch(`${API_BASE}/api/guides/${id}`)
            .then(res => res.json())
            .then(setGuide)
            .finally(() => setLoading(false));
    }, [id]);

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        setImgFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 이미지 업로드(선택)
        let imageUrl = guide.imageUrl;
        if (imgFile) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                imageUrl = reader.result;
                await updateGuide(imageUrl);
            };
            reader.readAsDataURL(imgFile);
        } else {
            await updateGuide(imageUrl);
        }
    };

    // 수정 fetch
    const updateGuide = async (imageUrl) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/guides/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                ...guide,
                imageUrl
            })
        });
        if (res.ok) {
            alert("수정 완료!");
            navigate("/my-guides");
        } else {
            alert("수정 실패");
        }
    };

    if (loading) return <div className="text-white pt-40 text-center">불러오는 중...</div>;
    if (!guide) return <div className="text-white pt-40 text-center">공략글이 없습니다.</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-28 px-4">
            <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-yellow-400 mb-6">✏️ 공략 수정</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                        placeholder="제목"
                        value={guide.title}
                        onChange={e => setGuide({ ...guide, title: e.target.value })}
                        required
                    />
                    <input
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                        placeholder="게임명"
                        value={guide.game}
                        onChange={e => setGuide({ ...guide, game: e.target.value })}
                        required
                    />
                    <textarea
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                        rows={2}
                        placeholder="요약"
                        value={guide.summary}
                        onChange={e => setGuide({ ...guide, summary: e.target.value })}
                        required
                    />
                    <textarea
                        className="w-full px-3 py-4 rounded bg-gray-700 text-white"
                        rows={8}
                        placeholder="공략 본문(markdown 지원)"
                        value={guide.full}
                        onChange={e => setGuide({ ...guide, full: e.target.value })}
                        required
                    />
                    {/* 이미지 업로드 */}
                    <div>
                        <label className="block mb-2">대표 이미지 첨부</label>
                        <input
                            type="file"
                            accept="image/*"
                            ref={imgInput}
                            onChange={handleImgChange}
                        />
                        {guide.imageUrl && (
                            <img src={guide.imageUrl} alt="공략 대표" className="mt-3 rounded shadow w-64" />
                        )}
                    </div>
                    <button className="bg-yellow-500 text-black py-2 px-6 rounded hover:bg-yellow-600 font-bold w-full">
                        저장하기
                    </button>
                </form>
            </div>
        </div>
    );
}

