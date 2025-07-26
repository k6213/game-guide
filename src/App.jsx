import Header from "@/components/Header";
import AppRouter from "@/routes/Router";
import { UserProvider } from "@/contexts/UserContext";
import Footer from "@/components/Footer";
import SupportFloatingButton from "@/components/SupportFloatingButton"; // 추가

export default function App() {
    return (
        <UserProvider>
            <div className="flex flex-col min-h-screen bg-black relative">
                {/* 상단 고정 헤더 */}
                <Header />

                {/* 중앙: 항상 화면을 꽉 채움 (main의 padding은 페이지 내부에서 조절) */}
                <main className="flex-1 flex flex-col">
                    <AppRouter />
                </main>

                {/* 하단 고정 푸터 */}
                <Footer />

                {/* 오른쪽 중간(PC)/오른쪽 하단(모바일) 떠다니는 후원 버튼 */}
                <SupportFloatingButton />
            </div>
        </UserProvider>
    );
}
