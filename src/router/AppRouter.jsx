// src/router/AppRouter.jsx
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import LandingPage from "../pages/Landing/LandingPage";
import PlannerPage from "../pages/Planner/PlannerPage";
import AIThinkingPage from "../pages/AIThinking/AIThinkingPage";
import ItineraryPage from "../pages/Itinerary/ItineraryPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import VaultPage from "../pages/Vault/VaultPage";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";

/**
 * ChromeLayout
 *
 * Standard page shell: sticky Navbar + routed page + Footer. The Landing
 * page renders its own transparent navbar treatment (video hero behind it),
 * every other "chrome" page gets the solid cream navbar.
 */
const ChromeLayout = () => {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-[#FDF6EE]">
      <Navbar transparent={isLanding} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

/**
 * BareLayout
 *
 * Full-bleed shell with no navbar/footer — used for the AI Thinking
 * ("Crafting your Escape") screen, which is a focused, chrome-free moment
 * between the planner and the finished itinerary.
 */
const BareLayout = () => (
  <div className="min-h-screen bg-[#FDF6EE]">
    <Outlet />
  </div>
);

/**
 * AppRouter
 *
 * Route map:
 *  /                    → Landing (hero video, destinations, testimonials, FAQ)
 *  /planner             → Multi-step AI planner questionnaire
 *  /crafting            → AI "thinking" transition screen (chrome-free)
 *  /itinerary           → Generated itinerary (day timeline + route map)
 *  /itinerary/:tripId    → A specific saved/past itinerary
 *  /dashboard           → Trip readiness dashboard (budget, packing, weather)
 *  /vault               → Vault of past journeys / digital journals
 *  /vault/:tripSlug     → A single journal entry
 *  /login               → Log in
 *  /signup              → Create an account
 *  /profile             → Logged-in user's profile (protected)
 *  *                    → redirect home
 */
const AppRouter = () => {
  return (
    <Routes>
      <Route element={<ChromeLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/itinerary/:tripId" element={<ItineraryPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/vault/:tripSlug" element={<VaultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<BareLayout />}>
        <Route path="/crafting" element={<AIThinkingPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;