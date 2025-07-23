// src/pages/FaqDetailPage.jsx
import { useParams, Link } from "react-router-dom";

const faqDetails = [
    {
        question: "공략이 저장되지 않아요.",
        answer: (
            <>
                <p>
                    <b>저장 오류 원인:</b> <br />
                    1. 로그인이 되어 있지 않으면 공략 저장이 안 됩니다.<br />
                    2. 서버 연결이 끊겼거나 네트워크 오류가 있을 수 있습니다.<br />
                    3. 필수 입력 항목(제목, 내용 등)이 빠졌는지 확인해 주세요.<br />
                    4. 브라우저 확장 프로그램(광고 차단, 프록시 등)이 요청을 막을 수 있습니다.<br />
                </p>
                <p className="mt-4">
                    <b>해결 방법:</b> <br />
                    - 로그아웃 후 다시 로그인해 보세요.<br />
                    - 새로고침 후 저장을 다시 시도해 보세요.<br />
                    - 위 방법으로도 해결이 안 되면, 고객센터로 문의해 주세요.
                </p>
            </>
        ),
    },
    {
        question: "AI 생성이 느릴 때는 어떻게 하나요?",
        answer: (
            <>
                <p>
                    AI 공략 생성은 서버 상황 및 API 사용량에 따라 시간이 걸릴 수 있습니다.<br />
                    네트워크 환경을 확인하고, 잠시 후 다시 시도해 주세요.<br />
                    <b>너무 오래 걸리면:</b> 페이지 새로고침 또는 로그아웃 후 재로그인!
                </p>
            </>
        ),
    },
    {
        question: "계정 비밀번호를 잊어버렸어요.",
        answer: (
            <>
                <p>
                    비밀번호 찾기/재설정 기능은 곧 추가될 예정입니다.<br />
                    급하게 계정 복구가 필요하다면, 이메일로 문의해 주세요.<br />
                    <span className="text-blue-400">zxdcf6213@naver.com</span>
                </p>
            </>
        ),
    },
];

export default function FaqDetailPage() {
    const { id } = useParams();
    const faq = faqDetails[parseInt(id) - 1];

    if (!faq) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                해당 FAQ를 찾을 수 없습니다.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white px-4 pt-28 pb-16">
            <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8">
                <Link to="/support" className="text-blue-400 no-underline text-sm mb-6 inline-block">
                    ← 고객지원센터로 돌아가기
                </Link>
                <h1 className="text-2xl font-bold mb-4">{faq.question}</h1>
                <div className="text-gray-200 text-lg">{faq.answer}</div>
            </div>
        </div>
    );
}
