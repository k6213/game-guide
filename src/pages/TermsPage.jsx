// src/pages/TermsPage.jsx
export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 pt-28 pb-16">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-extrabold text-yellow-400 mb-8">이용약관</h1>
                <p className="mb-4">본 약관은 모두의 공략집(이하 ‘사이트’)이 제공하는 서비스의 이용과 관련하여 회원과 사이트 간의 권리, 의무 및 책임사항, 이용조건 및 절차, 기타 필요한 사항을 규정합니다.</p>
                <h2 className="text-xl font-bold mt-8 mb-2">제1조 (목적)</h2>
                <p className="mb-2">이 약관은 사이트가 제공하는 모든 서비스(이하 '서비스')의 이용과 관련하여 사이트와 회원간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                <h2 className="text-xl font-bold mt-8 mb-2">제2조 (정의)</h2>
                <ul className="list-disc pl-6 mb-2">
                    <li>‘회원’이라 함은 본 약관에 따라 서비스 이용계약을 체결하고 이용자 아이디(ID)를 부여받은 자를 말합니다.</li>
                    <li>‘이용자’라 함은 사이트에 접속하여 본 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                </ul>
                <h2 className="text-xl font-bold mt-8 mb-2">제3조 (약관의 게시와 개정)</h2>
                <p className="mb-2">사이트는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기화면 또는 연결화면에 게시합니다.</p>
                {/* ... 필요시 추가 약관 내용 ... */}
                <h2 className="text-xl font-bold mt-8 mb-2">제4조 (서비스의 제공 및 변경)</h2>
                <p className="mb-2">사이트는 본 서비스의 제공을 위해 최선을 다합니다. 다만, 불가피한 사유가 있는 경우 서비스의 내용, 운영, 이용시간 등을 변경할 수 있습니다.</p>
                {/* ... 약관 항목 더 추가 ... */}
                <h2 className="text-xl font-bold mt-8 mb-2">제5조 (회원의 의무)</h2>
                <ul className="list-disc pl-6 mb-2">
                    <li>회원은 서비스 이용 시 관련 법령, 본 약관 및 서비스 이용안내, 사이트가 공지하는 사항을 준수해야 합니다.</li>
                    <li>타인의 정보를 도용하거나 서비스 운영을 방해해서는 안 됩니다.</li>
                </ul>
                <h2 className="text-xl font-bold mt-8 mb-2">제6조 (면책조항)</h2>
                <p className="mb-2">사이트는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도 및 정확성 등에 대해 책임을 지지 않습니다. 서비스 이용 과정에서 발생하는 문제는 회원 본인의 책임 하에 해결해야 합니다.</p>
                {/* ... */}
            </div>
        </div>
    );
}
