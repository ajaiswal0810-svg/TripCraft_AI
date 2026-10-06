// src/pages/Landing/WhyTripCraft.jsx
import { useState, useRef, useEffect } from "react";
import { Compass, SlidersHorizontal, Sparkles, Plane, Camera, CloudSun, Wallet, Headphones, ArrowUpRight } from "lucide-react";
import Button from "../../components/Button";

const JOURNEY_STEPS = [
  { id: "discover", label: "Discover", icon: Compass, description: "Share your mood, desired climate and interests." },
  { id: "personalize", label: "Personalize", icon: SlidersHorizontal, description: "Fine-tune your pace from 'Deep Rest' to 'High Adventure'." },
  { id: "ai-crafts", label: "AI Crafts", icon: Sparkles, description: "Instant generation of a bespoke, multi-layered itinerary.", active: true },
  { id: "travel", label: "Travel", icon: Plane, description: "Seamless bookings and real-time smart concierge support." },
  { id: "memories", label: "Memories", icon: Camera, description: "Return with curated digital journals of your journey." },
];

const STATS = [
  { id: "satisfaction", value: 98, suffix: "%", label: "Satisfaction Rate" },
  { id: "destinations", value: 142, suffix: "+", label: "Exclusive Destinations" },
  { id: "journeys", value: 12, suffix: "k", label: "Journeys Crafted" },
  { id: "response", value: 35, suffix: "ms", label: "AI Response Time" },
];

/* ── Count-up hook ─────────────────────────────────────────────────────── */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );
    if (nodeRef.current) obs.observe(nodeRef.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return [count, nodeRef];
}

const StatItem = ({ value, suffix, label }) => {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} className="ai-stat-item text-center">
      <p className="text-4xl font-bold text-white sm:text-5xl font-display tracking-tight">
        {count}{suffix}
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.15em] font-semibold text-white/40">{label}</p>
    </div>
  );
};

/* ── Staggered reveal hook ─────────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [visible, ref];
}

const WhyTripCraft = () => {
  const [sectionVisible, sectionRef] = useReveal();
  const [gridVisible, gridRef] = useReveal(0.15);

  return (
    <section
      className="ai-journey-section relative overflow-hidden py-28 sm:py-36"
      style={{
        background: "linear-gradient(180deg, #071c24 0%, #06161c 100%)",
      }}
    >
      {/* Ambient background styling */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute right-[-10%] top-1/4 h-[500px] w-[500px] rounded-full blur-[100px]" style={{ background: "radial-gradient(circle, rgba(226,87,43,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          ref={sectionRef}
          className="text-center flex flex-col items-center"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="ai-section-eyebrow flex items-center gap-2 mb-5">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#E8A23D]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8A23D]">
              The Art of Discovery
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#E8A23D]" />
          </div>
          
          <h2 className="text-balance text-4xl font-bold text-white sm:text-5xl max-w-2xl font-display leading-[1.12]">
            A Journey Tailored to Your Soul
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Skip the logistics. Embrace the magic. Our AI understands your preferences before you even articulate them.
          </p>
        </div>

        {/* Journey steps rail */}
        <div className="journey-rail mt-20 relative">
          {/* Connector line */}
          <div className="absolute top-8 left-[10%] right-[10%] hidden h-px bg-white/10 sm:block" />
          <div className={`journey-rail-progress absolute top-8 left-[10%] right-[10%] hidden h-px sm:block ${sectionVisible ? "is-visible" : ""}`} />

          <div className="grid grid-cols-2 gap-y-12 gap-x-4 sm:grid-cols-5 relative z-10">
            {JOURNEY_STEPS.map((step, i) => (
              <div
                key={step.id}
                className={`journey-step flex flex-col items-center text-center group ${step.active ? "is-active" : ""}`}
                style={{
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "none" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 100 + 200}ms, transform 0.5s ease ${i * 100 + 200}ms`,
                }}
              >
                <div
                  className="journey-step-icon relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:-translate-y-1"
                  style={{
                    background: step.active ? "linear-gradient(135deg, #E8A23D, #E2572B)" : "rgba(255,255,255,0.03)",
                    border: step.active ? "none" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: step.active ? "0 8px 24px rgba(226,87,43,0.3)" : "none",
                  }}
                >
                  <step.icon className={`journey-icon h-6 w-6 ${step.active ? "text-white" : "text-white/40 group-hover:text-white/80 transition-colors"}`} />
                  
                  {step.active && (
                    <div className="absolute -inset-2 rounded-2xl border border-[#E8A23D]/30 animate-soft-pulse" />
                  )}
                </div>
                <h3 className={`mt-5 text-sm font-bold ${step.active ? "text-white" : "text-white/70"}`}>
                  {step.label}
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/40 max-w-[140px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature grid */}
        <div ref={gridRef} className="mt-32">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E2572B]">
              Precision Engineering for Luxury
            </p>
            <p className="mt-2 text-sm text-white/50">
              Every feature is designed to reduce cognitive load.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2">
            {/* Hyper-personalized — wide left tile */}
            <div
              className="ai-feature-card ai-feature-card--primary group relative flex flex-col justify-between overflow-hidden rounded-[24px] p-8 md:col-span-2 md:row-span-1"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "none" : "translateY(30px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div className="absolute top-0 right-0 h-full w-2/3 bg-gradient-to-l from-[#E8A23D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#E8A23D]">
                  <Sparkles className="h-3 w-3" />
                  Proprietary AI Engine
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl font-display">
                  Hyper-Personalized Itineraries
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                  Our neural network analyzes over 15,000 data points to craft a schedule that flows naturally, avoiding peak crowds and maximizing sunlight hours.
                </p>
              </div>
              <Button variant="outlineLight" size="sm" className="mt-8 w-fit relative z-10">
                Explore AI Tech
              </Button>
            </div>

            {/* Predictive weather — right top tile */}
            <div
              className="ai-feature-card ai-feature-card--weather group relative overflow-hidden rounded-[24px] p-8"
              style={{
                background: "rgba(15,61,77,0.4)",
                border: "1px solid rgba(15,61,77,0.8)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "none" : "translateY(30px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#E8A23D]/20 blur-2xl group-hover:bg-[#E8A23D]/30 transition-colors" />
              <CloudSun className="feature-icon relative z-10 h-8 w-8 text-[#E8A23D] mb-4" />
              <h3 className="relative z-10 text-xl font-bold text-white font-display">Predictive Smart Weather</h3>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/60">
                We don't just show the forecast — we adjust your lunch spot or coastal walk in real-time to guarantee perfect lighting.
              </p>
            </div>

            {/* Invisible budgeting — left bottom tile */}
            <div
              className="ai-feature-card group relative overflow-hidden rounded-[24px] p-8"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "none" : "translateY(30px)",
                transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  <Wallet className="feature-icon h-5 w-5 text-white/70" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white font-display">Invisible Budgeting</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Sophisticated analysis that balances luxury with value, ensuring every dollar spent delivers maximum experiential ROI.
              </p>
              <button className="mt-5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#E8A23D] group-hover:text-[#FBBF68] transition-colors">
                Learn more <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>

            {/* Elite concierge — wide right bottom tile */}
            <div
              className="ai-feature-card ai-feature-card--concierge group relative overflow-hidden flex flex-col justify-between rounded-[24px] p-8 md:col-span-2"
              style={{
                background: "linear-gradient(135deg, #E2572B 0%, #C94623 100%)",
                boxShadow: "0 12px 40px rgba(226,87,43,0.25)",
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "none" : "translateY(30px)",
                transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
              }}
            >
              <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-black/20 to-transparent" />
              
              <div className="relative z-10 flex h-full flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white md:text-3xl font-display">Elite Concierge Access</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">
                    24/7 priority support that combines human empathy with AI speed. Reservations at "Fully Booked" locations are just a tap away.
                  </p>
                </div>
                
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl group-hover:scale-105 transition-transform duration-500">
                  <Headphones className="feature-icon h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="ai-stats mt-32 grid grid-cols-2 gap-3 border-t border-white/10 pt-10 sm:grid-cols-4 sm:gap-4 sm:pt-16">
          {STATS.map((stat) => (
            <StatItem key={stat.id} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTripCraft;
