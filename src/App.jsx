import Header from "@/components/Header";
import AppRouter from "@/routes/Router";
import { UserProvider } from "@/contexts/UserContext"; // ✅ 경로 수정
import Footer from "@/components/Footer"; 

export default function App() {
    return (
        <UserProvider>
            <div className="flex flex-col min-h-screen bg-black">
                <Header />
                <main className="flex-1">
                    <AppRouter />
                </main>
                <Footer />  {/* ✅ 항상 하단에 고정 */}
            </div>
        </UserProvider>
    );
}


