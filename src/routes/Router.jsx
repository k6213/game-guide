// src/routes/Router.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import GuideListPage from "../pages/GuideListPage";
import GameRankingPage from "../pages/GameRankingPage";
import SupportPage from "../pages/SupportPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import GameDetailPage from "../pages/GameDetailPage";
import GuideDetailPage from "@/pages/GuideDetailPage";
import FaqDetailPage from "@/pages/FaqDetailPage";
import MyGuidesPage from "@/pages/MyGuidesPage";
import EditGuidePage from "@/pages/EditGuidePage"; // 👈 추가!
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import DisclaimerPage from "@/pages/DisclaimerPage";


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/guides" element={<GuideListPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/rankings" element={<GameRankingPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/games/:id" element={<GameDetailPage />} />
            <Route path="/guides/:id" element={<GuideDetailPage />} /> 
            <Route path="/support/faq/:id" element={<FaqDetailPage />} />
            <Route path="/my-guides" element={<MyGuidesPage />} />
            <Route path="/guides/edit/:id" element={<EditGuidePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
        </Routes>
    );
}



