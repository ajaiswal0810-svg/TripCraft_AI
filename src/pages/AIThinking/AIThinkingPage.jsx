// src/pages/AIThinking/AIThinkingPage.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, ThermometerSun, CheckCircle2, XCircle,
  Landmark, Coffee, ShoppingBag, Footprints, Store,
  SlidersHorizontal, ArrowRight, Pencil, Sparkles, MapPin,
} from "lucide-react";
import Button from "../../components/Button";

const CRAFTING_STEPS = [
  { label: "Reading your mood and pace", icon: Sparkles },
  { label: "Cross-checking real-time weather", icon: Sun },
  { label: "Mapping optimal daily routes", icon: MapPin },
  { label: "Balancing rest with discovery", icon: CheckCircle2 },
  { label: "Finalizing your itinerary", icon: Sparkles },
];

const AI_PREVIEW = {
  destination: "Athens",
  forecast: { temp: 40, condition: "Extreme Heat Warning", window: "Peak sun 12:00–16:00" },
  recommended: [
    { id: "r1", label: "Acropolis Museum", note: "Fully climate-controlled sanctuary.", icon: Landmark },
    { id: "r2", label: "Indoor Specialty Cafés", note: "Stay hydrated in air-conditioned comfort.", icon: Coffee },
    { id: "r3", label: "Ermou Shopping District", note: "Boutique hopping with shade.", icon: ShoppingBag },
  ],
  avoid: [
    { id: "a1", label: "Mount Lycabettus Trek", note: "Risk of heat exhaustion. Rescheduling to sunset.", icon: Footprints },
    { id: "a2", label: "Outdoor Flea Markets", note: "Intense exposure. Monastiraki best after 6PM.", icon: Store },
  ],
  previewDays: [
    { id: "d1", label: "DAY 01", title: "Urban Mythology", image: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=600&auto=format&fit=crop", time: "09:00 — Private Tour Acropolis", note: "Starting early to beat the 40°C peak. AI has secured a skip-the-line pass." },
    { id: "d2", label: "DAY 02", title: "Riviera Retreat", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop", time: "11:00 — Astir Beach Lounge", note: "Rescheduled for coastal breeze. AI detected 5° cooler temperatures near the water." },
    { id: "d3", label: "DAY 03", title: "Hidden Athens", image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&auto=format&fit=crop", time: "10:30 — Plaka Coffee Walk", note: "Exploring shaded alleyways through the oldest neighborhood in the city." },
  ],
};

const AIThinkingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = location.state?.answers;
  const destination = answers?.destination || AI_PREVIEW.destination;

  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 16 + 4);
        setActiveStep(Math.min(CRAFTING_STEPS.length - 1, Math.floor((next / 100) * CRAFTING_STEPS.length)));
        if (next >= 100) clearInterval(id);
        return next;
      });
    }, 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setPhase("revealed"), 600);
      return () => clearTimeout(t);
    }
  }, [progress]);

  return (
    <div className="relative min-h-[calc(100vh-73px)] overflow-hidden">
      {/* Full-page atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B2E3A] via-[#0F3D4D] to-[#16515f]" />
      <div className="pointer-events-none absolute top-0 left-[20%] h-96 w-96 rounded-full bg-[#E8A23D]/10 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-10 right-[10%] h-72 w-72 rounded-full bg-[#E2572B]/10 blur-3xl animate-float [animation-delay:1.8s]" />
      <div className="pointer-events-none absolute top-1/2 left-[5%] h-56 w-56 rounded-full bg-[#16515f]/60 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-12">

        {/* ── LOADING PHASE ── */}
        <AnimatePresence>
          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Pulsing orb */}
              <div className="relative flex items-center justify-center">
                <div className="absolute h-32 w-32 rounded-full bg-[#E8A23D]/20 animate-soft-pulse" />
                <div className="absolute h-20 w-20 rounded-full bg-[#E8A23D]/30 animate-soft-pulse [animation-delay:0.3s]" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#E8A23D] to-[#E2572B] shadow-lg shadow-[#E2572B]/40">
                  <Sparkles className="h-6 w-6 text-white animate-soft-pulse" />
                </div>
              </div>

              <h2 className="mt-8 text-center text-3xl font-bold text-white sm:text-4xl">
                Crafting your{" "}
                <span className="gradient-text">{destination}</span> Escape
              </h2>
              <p className="mt-2 text-sm text-white/50">Powered by TripCraft AI</p>

              {/* Step list */}
              <div className="mt-10 w-full max-w-md space-y-3">
                {CRAFTING_STEPS.map((s, i) => {
                  const Icon = s.icon;
                  const done = i < activeStep;
                  const active = i === activeStep;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-500 ${
                        active
                          ? "bg-white/15 border border-white/20"
                          : done
                          ? "bg-white/5"
                          : "opacity-30"
                      }`}
                    >
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                        done ? "bg-[#1F8A5F]" : active ? "bg-gradient-to-br from-[#E8A23D] to-[#E2572B]" : "bg-white/10"
                      }`}>
                        {done
                          ? <CheckCircle2 className="h-4 w-4 text-white" />
                          : <Icon className={`h-3.5 w-3.5 text-white ${active ? "animate-soft-pulse" : ""}`} />
                        }
                      </div>
                      <span className={`text-sm font-medium ${active ? "text-white" : done ? "text-white/60" : "text-white/30"}`}>
                        {s.label}
                      </span>
                      {active && (
                        <span className="ml-auto flex gap-0.5">
                          {[0,1,2].map((d) => (
                            <span key={d} className="h-1 w-1 rounded-full bg-[#E8A23D]"
                              style={{ animation: `typing-dot 1.2s ease-in-out ${d * 0.2}s infinite` }} />
                          ))}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-8 w-full max-w-md">
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>Analysing preferences</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#E2572B] to-[#E8A23D] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── REVEALED PHASE ── */}
        {phase === "revealed" && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="mb-8 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1F8A5F]/20 border border-[#1F8A5F]/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#1F8A5F]">
                <CheckCircle2 className="h-3.5 w-3.5" /> Itinerary Ready
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Your <span className="gradient-text">{destination}</span> journey is crafted
              </h2>
              <p className="mt-2 text-sm text-white/50">AI has personalised every detail based on your preferences</p>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Forecast */}
              <div className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Today's Forecast</p>
                <div className="mt-3 flex items-center gap-2">
                  <Sun className="h-8 w-8 text-[#E8A23D] animate-soft-pulse" />
                  <span className="text-4xl font-bold text-white">{AI_PREVIEW.forecast.temp}°</span>
                </div>
                <p className="mt-3 flex items-start gap-2 text-sm text-white/70">
                  <ThermometerSun className="mt-0.5 h-4 w-4 shrink-0 text-[#E2572B]" />
                  {AI_PREVIEW.forecast.condition}: {AI_PREVIEW.forecast.window}
                </p>
                <span className="mt-4 inline-block rounded-full bg-[#E2572B]/20 border border-[#E2572B]/30 px-3 py-1.5 text-xs font-semibold text-[#E2572B]">
                  Heat Wave Protocol Active
                </span>
              </div>

              {/* Recommended */}
              <div className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#1F8A5F]" /> Highly Recommended
                </p>
                <div className="mt-4 space-y-2.5">
                  {AI_PREVIEW.recommended.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 rounded-xl bg-white/8 p-3">
                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#E8A23D]" />
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-white/50">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avoid */}
              <div className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                  <XCircle className="h-3.5 w-3.5 text-[#E2572B]" /> Avoid For Now
                </p>
                <div className="mt-4 space-y-2.5">
                  {AI_PREVIEW.avoid.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 rounded-xl bg-[#E2572B]/8 p-3">
                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#E2572B]" />
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-white/50">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Day preview */}
            <div className="mt-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold text-white">Refined Itinerary Preview</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/70 transition-all hover:border-white/40 hover:text-white">
                    <SlidersHorizontal className="h-3.5 w-3.5" /> Refine
                  </button>
                  <button
                    onClick={() => navigate("/itinerary", { state: { answers } })}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E2572B] to-[#E8A23D] px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-[#E2572B]/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Finalise Trip <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {AI_PREVIEW.previewDays.map((day, i) => (
                  <motion.div
                    key={day.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/30"
                  >
                    <div className="relative overflow-hidden">
                      <img src={day.image} alt={day.title} className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <button
                        aria-label={`Edit ${day.label}`}
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <span className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-wider text-[#E8A23D]">
                        {day.label}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-base font-semibold text-white">{day.title}</h4>
                      <p className="mt-2 text-sm font-medium text-white/70">{day.time}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/45">{day.note}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIThinkingPage;
