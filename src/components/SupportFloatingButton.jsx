import { useState } from "react";

export default function SupportFloatingButton() {
    const [showEmail, setShowEmail] = useState(false);

    const handleClick = () => setShowEmail((v) => !v);

    return (
        <div>
            {/* PC용: 오른쪽 중간 */}
            <div className="hidden sm:block fixed top-1/2 right-4 -translate-y-1/2 z-50">
                <button
                    onClick={handleClick}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg transition-all text-lg"
                >
                    ❤️ 후원하기
                </button>
                {showEmail && (
                    <div className="mt-4 bg-white text-black rounded-xl shadow-xl p-4 text-center font-semibold w-64 animate-fadeIn">
                        후원 문의<br />
                        <span className="text-blue-600 select-all">zxdcf170@naver.com</span>
                        <div>
                            <button
                                onClick={handleClick}
                                className="mt-3 text-xs text-gray-600 underline"
                            >닫기</button>
                        </div>
                    </div>
                )}
            </div>
            {/* 모바일용: 오른쪽 하단 */}
            <div className="sm:hidden fixed bottom-5 right-5 z-50">
                <button
                    onClick={handleClick}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg transition-all text-base"
                >
                    ❤️ 후원
                </button>
                {showEmail && (
                    <div className="mt-3 bg-white text-black rounded-xl shadow-xl p-4 text-center font-semibold w-64 animate-fadeIn">
                        후원 문의<br />
                        <span className="text-blue-600 select-all">zxdcf170@naver.com</span>
                        <div>
                            <button
                                onClick={handleClick}
                                className="mt-3 text-xs text-gray-600 underline"
                            >닫기</button>
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px);}
                    to   { opacity: 1; transform: none;}
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s;
                }
            `}</style>
        </div>
    );
}
