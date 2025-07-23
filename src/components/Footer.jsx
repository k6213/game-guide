export default function Footer() {
    return (
        <footer className="relative z-10 bg-black bg-opacity-80 text-center py-8 border-t border-gray-700 mt-auto text-gray-400 text-sm">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
                <div>
                    <span className="font-semibold text-white">© 2025 모두의 공략집</span>
                    <span className="mx-2 hidden md:inline">|</span>
                    <span>All Rights Reserved.</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-2 md:mt-0">
                    <a href="/terms" className="hover:text-yellow-400 no-underline">이용약관</a>
                    <a href="/privacy" className="hover:text-yellow-400 no-underline">개인정보처리방침</a>
                    <a href="/disclaimer" className="hover:text-yellow-400 no-underline">책임의 한계와 법적고지</a>
                    <a href="/support" className="hover:text-yellow-400 no-underline">고객지원</a>
                </div>
            </div>
            <div className="mt-5 text-xs text-gray-500">
                본 서비스는 AI 및 커뮤니티 기반 게임 공략 정보 제공 사이트입니다.<br />
                실제 게임 플레이/거래/결과에 대한 법적 책임을 지지 않으며, 모든 정보는 참고용입니다.<br />
                <span className="font-semibold text-gray-400">Contact:</span> zxdcf6213@naver.com
            </div>
            <div className="mt-2 text-xs text-gray-500">
                Made with ❤️ by Soeun
            </div>
        </footer>
    );
}
