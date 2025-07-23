// src/pages/DisclaimerPage.jsx
export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 pt-28 pb-16">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-extrabold text-yellow-400 mb-8">책임의 한계와 법적 고지</h1>
                <p className="mb-4">
                    모두의 공략집은 이용자의 자발적인 참여와 AI 정보를 바탕으로 공략 정보를 제공하며, 게임사 및 공식 정보와는 다를 수 있습니다.
                </p>
                <ul className="list-disc pl-6 mb-2">
                    <li>모든 콘텐츠는 참고용이며, 실제 게임 결과 및 공식 정책에 우선권이 있습니다.</li>
                    <li>이 사이트는 사용자 게시글 및 댓글에 대해 모니터링 및 삭제 권한을 보유합니다.</li>
                    <li>사이트 내 모든 지적재산권(텍스트, 이미지, 코드 등)은 저작권법에 의해 보호받으며 무단 복제/배포/상업적 이용을 금지합니다.</li>
                    <li>광고, 링크, 외부 사이트 정보는 해당 서비스 제공자의 책임 하에 운영됩니다.</li>
                </ul>
                <p className="mt-6">문의: <span className="text-yellow-300">guide@yourdomain.com</span></p>
            </div>
        </div>
    );
}
