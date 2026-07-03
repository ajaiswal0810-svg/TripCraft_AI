// src/pages/Auth/SignupPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[#FDF6EE] px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,#fdf6ee_0%,#f4e8d8_46%,#e8f2ef_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(232,162,61,0.24)_0%,transparent_36%),radial-gradient(circle_at_86%_20%,rgba(15,61,77,0.24)_0%,transparent_34%),radial-gradient(circle_at_72%_84%,rgba(226,87,43,0.2)_0%,transparent_38%)]" />
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#E8A23D]/18 blur-3xl animate-float" />
      <div className="pointer-events-none absolute right-[-3.5rem] bottom-[-2rem] h-80 w-80 rounded-full bg-[#0F3D4D]/18 blur-3xl animate-float [animation-delay:1.4s]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/55 bg-white/70 p-8 shadow-[0_24px_80px_rgba(15,61,77,0.24)] ring-1 ring-[#E8A23D]/20 backdrop-blur-xl animate-fade-in-up">
        <span className="inline-flex rounded-full border border-[#E2572B]/30 bg-[#E2572B]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#0F3D4D]">
          New Journey
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-[#0F3D4D]">Create your account</h1>
        <p className="mt-1 text-sm text-[#0F3D4D]/65">Start crafting journeys, curated by intelligence.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-[#0F3D4D]">
            Name
            <span className="flex items-center gap-2 rounded-xl border border-[#0F3D4D]/15 bg-white/82 px-3 py-2.5 shadow-sm shadow-[#0F3D4D]/5 transition-colors focus-within:border-[#0F3D4D]/45 focus-within:shadow-md focus-within:shadow-[#0F3D4D]/10">
              <User className="h-4 w-4 text-[#0F3D4D]/40" />
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full bg-transparent text-sm text-[#0F3D4D] outline-none placeholder:text-[#0F3D4D]/35"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-[#0F3D4D]">
            Email
            <span className="flex items-center gap-2 rounded-xl border border-[#0F3D4D]/15 bg-white/82 px-3 py-2.5 shadow-sm shadow-[#0F3D4D]/5 transition-colors focus-within:border-[#0F3D4D]/45 focus-within:shadow-md focus-within:shadow-[#0F3D4D]/10">
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
            <span className="flex items-center gap-2 rounded-xl border border-[#0F3D4D]/15 bg-white/82 px-3 py-2.5 shadow-sm shadow-[#0F3D4D]/5 transition-colors focus-within:border-[#0F3D4D]/45 focus-within:shadow-md focus-within:shadow-[#0F3D4D]/10">
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
            className="mt-2 w-full rounded-full bg-gradient-to-r from-[#E2572B] via-[#E8A23D] to-[#0F3D4D] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E2572B]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#0F3D4D]/30 disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#0F3D4D]/60">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[#0F3D4D] underline underline-offset-2">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;