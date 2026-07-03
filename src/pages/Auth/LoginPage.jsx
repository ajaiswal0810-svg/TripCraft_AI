// src/pages/Auth/LoginPage.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[#FDF6EE] px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#fdf6ee_0%,#f2e4cf_42%,#e6f1ef_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(226,87,43,0.22)_0%,transparent_36%),radial-gradient(circle_at_84%_18%,rgba(15,61,77,0.24)_0%,transparent_34%),radial-gradient(circle_at_70%_80%,rgba(232,162,61,0.22)_0%,transparent_38%)]" />
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#E2572B]/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute right-[-4rem] bottom-[-2rem] h-80 w-80 rounded-full bg-[#0F3D4D]/20 blur-3xl animate-float [animation-delay:1.2s]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/55 bg-white/68 p-8 shadow-[0_24px_80px_rgba(15,61,77,0.24)] ring-1 ring-[#E2572B]/15 backdrop-blur-xl animate-fade-in-up">
        <span className="inline-flex rounded-full border border-[#E8A23D]/35 bg-[#E8A23D]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#0F3D4D]">
          TripCraft Access
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-[#0F3D4D]">Welcome back</h1>
        <p className="mt-1 text-sm text-[#0F3D4D]/65">Log in to keep crafting your journeys.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-[#0F3D4D]">
            Email
            <span className="flex items-center gap-2 rounded-xl border border-[#0F3D4D]/15 bg-white/80 px-3 py-2.5 shadow-sm shadow-[#0F3D4D]/5 transition-colors focus-within:border-[#0F3D4D]/45 focus-within:shadow-md focus-within:shadow-[#0F3D4D]/10">
              <Mail className="h-4 w-4 text-[#0F3D4D]/40" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm text-[#0F3D4D] outline-none placeholder:text-[#0F3D4D]/35"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-[#0F3D4D]">
            Password
            <span className="flex items-center gap-2 rounded-xl border border-[#0F3D4D]/15 bg-white/80 px-3 py-2.5 shadow-sm shadow-[#0F3D4D]/5 transition-colors focus-within:border-[#0F3D4D]/45 focus-within:shadow-md focus-within:shadow-[#0F3D4D]/10">
              <Lock className="h-4 w-4 text-[#0F3D4D]/40" />
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm text-[#0F3D4D] outline-none placeholder:text-[#0F3D4D]/35"
              />
            </span>
          </label>

          {error && <p className="text-sm text-[#D64545]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-gradient-to-r from-[#0F3D4D] via-[#16515f] to-[#E2572B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0F3D4D]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#E2572B]/35 disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#0F3D4D]/60">
          New to TripCraft?{" "}
          <Link to="/signup" className="font-medium text-[#0F3D4D] underline underline-offset-2">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;