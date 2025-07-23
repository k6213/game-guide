import { Link } from "react-router-dom";
import { useRef } from "react";
// import emailjs from "emailjs-com"; // 실제 연동은 주석처리

const faqs = [
    { q: "공략이 저장되지 않아요.", path: "/support/faq/1" },
    { q: "AI 생성이 느릴 때는 어떻게 하나요?", path: "/support/faq/2" },
    { q: "계정 비밀번호를 잊어버렸어요.", path: "/support/faq/3" },
];

export default function SupportPage() {
    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("📨 문의 보내기 기능은 현재 준비 중입니다. 곧 제공될 예정입니다! ( zxdcf6213@naver.com <- 여기로 보내주세요)");
        // 아래 실제 전송 로직은 준비중
        // emailjs.sendForm(
        //     "service_ue13dfa",
        //     "template_1203fun",
        //     formRef.current,
        //     "qol49DMoDnrpY0RDg"
        // )
        //     .then(
        //         () => alert("📨 문의가 정상적으로 접수되었습니다! 빠르게 답변드릴게요. "),
        //         () => alert("문의 전송에 실패했습니다. 다시 시도해주세요.")
        //     );
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white px-4 pt-28 pb-16">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-12">
                    📞 고객지원센터
                </h1>

                {/* FAQ 섹션 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-gray-700">
                        💡 자주 묻는 질문 (FAQ)
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <Link
                                key={idx}
                                to={faq.path}
                                className="block bg-gray-800 p-4 rounded-md shadow hover:bg-gray-700 transition cursor-pointer text-lg text-blue-300 no-underline"
                            >
                                🔹 {faq.q}
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 문의하기 폼 (준비중 안내) */}
                <section className="bg-gray-900 p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-gray-700">
                        ✉️ 문의하기
                    </h2>
                    <form
                        ref={formRef}
                        className="space-y-5"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="from_name"
                            placeholder="이름"
                            required
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            name="from_email"
                            placeholder="이메일"
                            required
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            name="message"
                            placeholder="문의 내용을 입력해주세요"
                            required
                            rows={5}
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold text-lg transition"
                        >
                            📮 문의 보내기
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}


