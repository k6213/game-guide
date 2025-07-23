// src/pages/PrivacyPage.jsx
export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 pt-28 pb-16">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-extrabold text-yellow-400 mb-8">개인정보처리방침</h1>
                <p className="mb-4">
                    모두의 공략집(이하 ‘사이트’)은 회원의 개인정보를 소중하게 생각하며, 관련 법령을 준수합니다.
                </p>
                <h2 className="text-xl font-bold mt-8 mb-2">1. 수집하는 개인정보 항목</h2>
                <ul className="list-disc pl-6 mb-2">
                    <li>회원가입 시: 아이디, 비밀번호</li>
                    <li>서비스 이용 과정에서 IP주소, 쿠키, 방문 일시 등</li>
                </ul>
                <h2 className="text-xl font-bold mt-8 mb-2">2. 개인정보의 수집 및 이용 목적</h2>
                <ul className="list-disc pl-6 mb-2">
                    <li>회원 관리, 서비스 제공 및 개선, 문의 처리 등</li>
                </ul>
                <h2 className="text-xl font-bold mt-8 mb-2">3. 개인정보 보유 및 이용 기간</h2>
                <p className="mb-2">
                    원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                </p>
                <h2 className="text-xl font-bold mt-8 mb-2">4. 개인정보 제공 및 위탁</h2>
                <p className="mb-2">
                    사이트는 회원의 동의 없이 개인정보를 외부에 제공하지 않습니다.
                </p>
                {/* ... */}
                <h2 className="text-xl font-bold mt-8 mb-2">5. 이용자의 권리와 행사 방법</h2>
                <ul className="list-disc pl-6 mb-2">
                    <li>이용자는 언제든지 등록된 자신의 개인정보를 조회, 수정, 삭제 요청할 수 있습니다.</li>
                </ul>
                <h2 className="text-xl font-bold mt-8 mb-2">6. 개인정보 보호책임자</h2>
                <p className="mb-2">
                    개인정보 관련 문의사항은 support@yourdomain.com 으로 연락 주시기 바랍니다.
                </p>
                {/* ... */}
            </div>
        </div>
    );
}
