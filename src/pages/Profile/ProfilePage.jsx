// src/pages/Profile/ProfilePage.jsx
import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-[#FDF6EE] px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,#fdf6ee_0%,#f3e5d2_44%,#e8f2ef_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(226,87,43,0.22)_0%,transparent_34%),radial-gradient(circle_at_86%_20%,rgba(15,61,77,0.24)_0%,transparent_36%),radial-gradient(circle_at_70%_84%,rgba(232,162,61,0.2)_0%,transparent_38%)]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#E2572B]/18 blur-3xl animate-float" />
      <div className="pointer-events-none absolute right-[-4rem] bottom-[-2rem] h-80 w-80 rounded-full bg-[#0F3D4D]/20 blur-3xl animate-float [animation-delay:1.3s]" />

      <div className="relative mx-auto max-w-2xl">
        <div className="rounded-3xl border border-white/55 bg-white/70 p-8 shadow-[0_24px_80px_rgba(15,61,77,0.24)] ring-1 ring-[#E2572B]/15 backdrop-blur-xl animate-fade-in-up">
          <span className="inline-flex rounded-full border border-[#E8A23D]/35 bg-[#E8A23D]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#0F3D4D]">
            Traveler Profile
          </span>

          <div className="flex items-center gap-4">
            <span className="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#E2572B] to-[#E8A23D] text-xl font-semibold text-white shadow-lg shadow-[#E2572B]/30">
              {user?.name?.[0]?.toUpperCase() || "?"}
            </span>
            <div className="pt-4">
              <h1 className="font-display text-3xl font-semibold text-[#0F3D4D]">{user?.name}</h1>
              <p className="text-sm text-[#0F3D4D]/60">{user?.email}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-[#0F3D4D]/10 pt-6">
            <div className="flex items-center gap-3 rounded-xl border border-[#0F3D4D]/10 bg-white/70 px-4 py-3 text-sm text-[#0F3D4D]/75 shadow-sm shadow-[#0F3D4D]/5">
              <User className="h-4 w-4" /> {user?.name}
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#0F3D4D]/10 bg-white/70 px-4 py-3 text-sm text-[#0F3D4D]/75 shadow-sm shadow-[#0F3D4D]/5">
              <Mail className="h-4 w-4" /> {user?.email}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0F3D4D] via-[#16515f] to-[#E2572B] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0F3D4D]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#E2572B]/30"
          >
            <LogOut className="h-4 w-4" /> Log Out
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;