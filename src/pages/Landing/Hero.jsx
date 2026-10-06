// src/pages/Landing/Hero.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Mic, Sparkles, MapPin, Clock,
  ArrowRight, Send, ChevronDown,
} from "lucide-react";
import { getTrendingDestinations } from "../../data/destinations";

/* ─────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&auto=format&fit=crop&q=80",
    label: "Taj Mahal",
    sublabel: "Agra, Uttar Pradesh",
  },
  {
    url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&auto=format&fit=crop&q=80",
    label: "Hawa Mahal",
    sublabel: "Jaipur, Rajasthan",
  },
  {
    url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&auto=format&fit=crop&q=80",
    label: "Backwater Canals",
    sublabel: "Kerala, South India",
  },
];

const SEARCH_PLACEHOLDERS = [
  "A quiet hill station for two…",
  "Desert safari in Rajasthan…",
  "Backwater houseboat in Kerala…",
  "Spiritual retreat in Rishikesh…",
  "Street food trail in Mumbai…",
];

const STATS = [
  { value: 50000, suffix: "+", label: "Trips Crafted" },
  { value: 4.9,   suffix: "",  label: "Avg Rating", decimal: true },
  { value: 120,   suffix: "+", label: "Destinations" },
];

const RECENT_SEARCHES = [
  "Sustainable luxury in Costa Rica",
  "Artisan boutique hotels in Paris",
];

const AI_CONVERSATION = [
  { role: "ai", text: "Where should your next story begin? ✨" },
  { role: "ai", text: "Tell me your dream vibe — I'll craft the perfect escape." },
];

const FOLLOW_UPS = [
  "How many days are you thinking?",
  "Solo adventure or with someone special?",
  "Any must-have experiences?",
];

/* ─────────────────────────────────────────────────────────────────────────
   COUNT-UP HOOK
───────────────────────────────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, decimal = false) {
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
            setCount(decimal ? +(eased * target).toFixed(1) : Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (nodeRef.current) obs.observe(nodeRef.current);
    return () => obs.disconnect();
  }, [target, duration, decimal]);

  return [count, nodeRef];
}

/* ─────────────────────────────────────────────────────────────────────────
   STAT ITEM
───────────────────────────────────────────────────────────────────────── */
const StatItem = ({ value, suffix, label, decimal }) => {
  const [count, ref] = useCountUp(value, 1600, decimal);
  return (
    <div ref={ref} className="flex flex-col items-center sm:items-start">
      <span className="text-3xl font-bold text-white tracking-tight font-display">
        {count}{suffix}
      </span>
      <span className="text-xs text-white/50 mt-0.5 uppercase tracking-widest font-medium">{label}</span>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────── */
const Hero = () => {
  const navigate = useNavigate();

  /* Slideshow */
  const [slideIdx, setSlideIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const goToSlide = useCallback((i) => {
    if (transitioning || i === slideIdx) return;
    setNextIdx(i);
    setTransitioning(true);
    setTimeout(() => {
      setSlideIdx(i);
      setNextIdx(null);
      setTransitioning(false);
    }, 1000);
  }, [transitioning, slideIdx]);

  useEffect(() => {
    const id = setInterval(() => {
      goToSlide((slideIdx + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slideIdx, goToSlide]);

  /* Animated placeholder */
  const [phIdx, setPhIdx] = useState(0);
  const [phText, setPhText] = useState("");
  const [phTyping, setPhTyping] = useState(true);

  useEffect(() => {
    let timeout;
    const full = SEARCH_PLACEHOLDERS[phIdx];
    if (phTyping) {
      if (phText.length < full.length) {
        timeout = setTimeout(() => setPhText(full.slice(0, phText.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setPhTyping(false), 2200);
      }
    } else {
      if (phText.length > 0) {
        timeout = setTimeout(() => setPhText(phText.slice(0, -1)), 28);
      } else {
        setPhIdx((i) => (i + 1) % SEARCH_PLACEHOLDERS.length);
        setPhTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [phText, phTyping, phIdx]);

  /* Planner / chat */
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [followUpIdx, setFollowUpIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [focused, setFocused] = useState(false);
  const chatEndRef = useRef(null);
  const trending = getTrendingDestinations();

  useEffect(() => {
    const t1 = setTimeout(() => setMessages([AI_CONVERSATION[0]]), 500);
    const t2 = setTimeout(() => setMessages(AI_CONVERSATION), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleExpand = () => setExpanded(true);

  const handleSend = (text) => {
    const msg = text || inputVal;
    if (!msg.trim()) return;
    setInputVal("");
    setQuery(msg);
    setMessages((prev) => [...prev, { role: "user", text: msg }]);

    if (followUpIdx < FOLLOW_UPS.length) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "ai", text: FOLLOW_UPS[followUpIdx] }]);
        setFollowUpIdx((i) => i + 1);
      }, 1000);
    } else {
      setTimeout(() => navigate("/planner", { state: { query: msg } }), 600);
    }
  };

  const handleExplore = (e) => {
    e.preventDefault();
    navigate("/planner", { state: { query } });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#071c24]"
      style={{ minHeight: "100svh" }}
    >
      {/* ══════════════════════════════════════════════════════════
          CINEMATIC BACKGROUND — Ken Burns + crossfade
      ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 overflow-hidden">
        {HERO_SLIDES.map((slide, i) => {
          const isCurrent = i === slideIdx;
          const isNext = i === nextIdx;
          return (
            <img
              key={i}
              src={slide.url}
              alt={slide.label}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                opacity: isCurrent ? (transitioning ? 0 : 1) : isNext ? 1 : 0,
                transform: isCurrent ? "scale(1.08)" : "scale(1.0)",
                transition: isCurrent
                  ? "opacity 1s ease-in-out, transform 8s ease-out"
                  : isNext
                  ? "opacity 1s ease-in-out"
                  : "none",
                zIndex: isNext ? 1 : isCurrent ? 2 : 0,
              }}
            />
          );
        })}

        {/* Multi-layer cinematic gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `
              linear-gradient(to right, rgba(7,28,36,0.85) 0%, rgba(7,28,36,0.3) 55%, rgba(7,28,36,0.15) 100%),
              linear-gradient(to bottom, rgba(7,28,36,0.5) 0%, rgba(7,28,36,0.0) 40%, rgba(7,28,36,0.7) 100%)
            `,
          }}
        />

        {/* Ambient glow orbs */}
        <div
          className="absolute z-10 rounded-full blur-3xl opacity-20 animate-float pointer-events-none"
          style={{
            width: 500, height: 500,
            top: "10%", left: "5%",
            background: "radial-gradient(circle, #E8A23D 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute z-10 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{
            width: 400, height: 400,
            top: "30%", right: "8%",
            background: "radial-gradient(circle, #E2572B 0%, transparent 70%)",
            animation: "float 6s ease-in-out 2s infinite",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          SLIDE INDICATORS — bottom left
      ══════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-8 left-8 z-30 flex items-center gap-5">
        <div className="flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`View ${HERO_SLIDES[i].label}`}
              className="group relative overflow-hidden rounded-full transition-all duration-500"
              style={{
                width: i === slideIdx ? 32 : 8,
                height: 4,
                background: i === slideIdx
                  ? "linear-gradient(90deg, #E8A23D, #E2572B)"
                  : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
        <div
          className="flex items-center gap-1.5 text-white/50 transition-opacity duration-700"
          style={{ opacity: transitioning ? 0 : 1 }}
        >
          <MapPin className="h-3 w-3 text-[#E2572B]" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
            {HERO_SLIDES[slideIdx].label}
          </span>
          <span className="text-[10px] text-white/35">·</span>
          <span className="text-[10px] text-white/35 uppercase tracking-wider">
            {HERO_SLIDES[slideIdx].sublabel}
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCROLL CUE — bottom right
      ══════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-8 right-8 z-30 flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
        <span className="text-[9px] text-white uppercase tracking-[0.2em] font-semibold"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          Scroll
        </span>
        <div className="h-8 w-px bg-white/30 relative overflow-hidden rounded-full">
          <div className="absolute inset-x-0 top-0 h-4 bg-white rounded-full animate-scroll-line" />
        </div>
        <ChevronDown className="h-3 w-3 text-white" strokeWidth={2} />
      </div>

      {/* ══════════════════════════════════════════════════════════
          PILL BADGE — top center
      ══════════════════════════════════════════════════════════ */}
      <div className="relative z-20 flex justify-center pt-28">
        <div
          className="flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/90 animate-fade-in-up"
          style={{
            animationDelay: "0.1s",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 24px rgba(232,162,61,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#E8A23D]"
            style={{ animation: "soft-pulse 1.8s ease-in-out infinite" }}
          />
          AI-Powered Exploration
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#E2572B]"
            style={{ animation: "soft-pulse 1.8s ease-in-out 0.6s infinite" }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT — left text + right card
      ══════════════════════════════════════════════════════════ */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 pt-10 pb-32">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-20">

          {/* ── LEFT: Headline + tagline + stats ───────────────── */}
          <div className="flex-1 min-w-0">

            {/* Headline */}
            <h1
              className="text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.05] text-white animate-fade-in-up"
              style={{ animationDelay: "0.2s", textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}
            >
              Craft memories,
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #FBBF68 0%, #E8A23D 30%, #E2572B 70%, #C94623 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 30px rgba(232,162,61,0.4))",
                }}
              >
                not itineraries.
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-white/70 animate-fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              Your sophisticated AI travel companion curates bespoke experiences
              that resonate with your soul.
            </p>

            {/* Divider */}
            <div
              className="mt-8 h-px w-16 animate-fade-in-up"
              style={{
                animationDelay: "0.45s",
                background: "linear-gradient(90deg, #E8A23D, transparent)",
              }}
            />

            {/* Count-up stats */}
            <div
              className="mt-6 flex flex-wrap gap-8 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              {STATS.map((s) => (
                <StatItem key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Planner card ──────────────────────────── */}
          <div
            className="w-full lg:w-[480px] shrink-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {/* Ambient glow behind card */}
            <div
              className="absolute -inset-4 rounded-[36px] blur-2xl opacity-60 pointer-events-none -z-10"
              style={{
                background: "radial-gradient(ellipse at center, rgba(232,162,61,0.25) 0%, rgba(226,87,43,0.15) 50%, transparent 80%)",
              }}
            />

            {/* Card border glow ring */}
            <div
              className="rounded-3xl p-[1.5px]"
              style={{
                background: "linear-gradient(135deg, rgba(232,162,61,0.7), rgba(226,87,43,0.5), rgba(255,255,255,0.1), rgba(15,61,77,0.4))",
                boxShadow: "0 0 40px rgba(232,162,61,0.25), 0 32px 64px rgba(0,0,0,0.4)",
              }}
            >
              {/* Card body */}
              <div
                className="rounded-[22px] p-7 relative overflow-hidden"
                style={{
                  background: "rgba(8, 24, 32, 0.75)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Card inner glow */}
                <div
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(232,162,61,0.12) 0%, transparent 70%)" }}
                />
                <div
                  className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full blur-2xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(226,87,43,0.1) 0%, transparent 70%)" }}
                />

                {expanded ? (
                  /* ── EXPANDED: AI chat ──────────────────────── */
                  <div className="relative">
                    {/* Header */}
                    <div className="mb-5 flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, #E8A23D, #E2572B)",
                          boxShadow: "0 4px 12px rgba(226,87,43,0.4)",
                        }}
                      >
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">AI Travel Planner</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: "soft-pulse 1.5s ease-in-out infinite" }} />
                          <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Online</span>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="max-h-48 space-y-3 overflow-y-auto no-scrollbar">
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex animate-chat-pop ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          style={{ animationDelay: `${i * 0.05}s` }}
                        >
                          {msg.role === "ai" && (
                            <div
                              className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                              style={{ background: "linear-gradient(135deg, #E8A23D, #E2572B)" }}
                            >
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                              msg.role === "ai"
                                ? "rounded-tl-sm text-white/90"
                                : "rounded-tr-sm text-white"
                            }`}
                            style={
                              msg.role === "ai"
                                ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }
                                : { background: "linear-gradient(135deg, rgba(15,61,77,0.9), rgba(22,81,95,0.9))", border: "1px solid rgba(255,255,255,0.1)" }
                            }
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex items-center gap-2 animate-chat-pop">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                            style={{ background: "linear-gradient(135deg, #E8A23D, #E2572B)" }}>
                            <Sparkles className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm px-4 py-3"
                            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                className="h-1.5 w-1.5 rounded-full bg-white/50"
                                style={{ animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite` }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <div
                      className="mt-5 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: focused ? "1px solid rgba(232,162,61,0.5)" : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: focused ? "0 0 0 3px rgba(232,162,61,0.1)" : "none",
                      }}
                    >
                      <input
                        autoFocus
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder="Type your answer..."
                        className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                      />
                      <button
                        onClick={() => handleSend()}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white transition-all hover:scale-110 hover:shadow-lg"
                        style={{
                          background: "linear-gradient(135deg, #E8A23D, #E2572B)",
                          boxShadow: "0 4px 12px rgba(226,87,43,0.3)",
                        }}
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={handleExplore}
                      className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-2xl py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 group"
                      style={{
                        background: "linear-gradient(135deg, #E2572B 0%, #E8A23D 100%)",
                        boxShadow: "0 8px 24px rgba(226,87,43,0.35), 0 2px 8px rgba(226,87,43,0.2)",
                      }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 32px rgba(226,87,43,0.5), 0 4px 12px rgba(226,87,43,0.3)"}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(226,87,43,0.35), 0 2px 8px rgba(226,87,43,0.2)"}
                    >
                      <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                      Craft My Journey
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>

                ) : (
                  /* ── COLLAPSED: Search form ──────────────────── */
                  <div className="relative">
                    {/* Card header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #E8A23D, #E2572B)",
                          boxShadow: "0 4px 16px rgba(226,87,43,0.35)",
                        }}
                      >
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-white leading-tight">
                          Where should your next story begin?
                        </h2>
                        <p className="text-xs text-white/40 mt-0.5">Powered by TripCraft AI</p>
                      </div>
                    </div>

                    {/* Search bar */}
                    <div
                      className="flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-300 group"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                      }}
                    >
                      <Search className="h-4 w-4 shrink-0 text-[#E8A23D]" strokeWidth={2.5} />
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={handleExpand}
                        placeholder={phText + (phTyping ? "|" : "")}
                        className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                      />
                      <button
                        type="button"
                        aria-label="Voice search"
                        className="shrink-0 text-white/30 hover:text-[#E8A23D] transition-colors duration-200 hover:scale-110"
                      >
                        <Mic className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Explore CTA */}
                    <button
                      onClick={handleExplore}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 group"
                      style={{
                        background: "linear-gradient(135deg, #E2572B 0%, #E8A23D 100%)",
                        boxShadow: "0 8px 24px rgba(226,87,43,0.35)",
                      }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 32px rgba(226,87,43,0.5)"}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(226,87,43,0.35)"}
                    >
                      <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                      Explore with AI
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    {/* Separator */}
                    <div className="flex items-center gap-3 my-5">
                      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
                      <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">Quick picks</span>
                      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
                    </div>

                    {/* Trending chips */}
                    <div className="mb-4">
                      <p className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
                        <MapPin className="h-3 w-3 text-[#E2572B]" />
                        Trending Now
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {trending.slice(0, 5).map((d) => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => { setQuery(d.name); handleExpand(); }}
                            className="rounded-xl px-3.5 py-1.5 text-xs font-medium text-white/70 transition-all duration-200 hover:text-white hover:-translate-y-0.5"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = "rgba(232,162,61,0.15)";
                              e.currentTarget.style.border = "1px solid rgba(232,162,61,0.35)";
                              e.currentTarget.style.color = "#E8A23D";
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                            }}
                          >
                            {d.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recent searches */}
                    <div>
                      <p className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
                        <Clock className="h-3 w-3" />
                        Recent
                      </p>
                      <div className="space-y-1.5">
                        {RECENT_SEARCHES.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => { setQuery(s); handleExpand(); }}
                            className="group flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs text-white/50 transition-all duration-200 hover:text-white/80"
                            style={{ background: "transparent" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >
                            <MapPin className="h-3 w-3 shrink-0 text-[#E2572B] opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="italic truncate">"{s}"</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ── end right ───────────────────────────────────────── */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
