// src/pages/Landing/FeaturedDestinations.jsx
import { useMemo, useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, MapPin, Star, Clock, ArrowUpRight } from "lucide-react";
import Button from "../../components/Button";
import DestinationCard from "../../components/DestinationCard";
import {
  destinationCategories,
  getFeaturedDestinations,
  getAiPickOfTheDay,
} from "../../data/destinations";

/* ── Staggered reveal hook ─────────────────────────────────────────────── */
function useReveal(threshold = 0.08) {
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

/* ── Section ───────────────────────────────────────────────────────────── */
const FeaturedDestinations = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sectionVisible, sectionRef] = useReveal();
  const [heroHovered, setHeroHovered] = useState(false);

  const aiPick = getAiPickOfTheDay();
  const featured = useMemo(
    () => getFeaturedDestinations().filter((d) => d.id !== aiPick?.id),
    [aiPick]
  );

  const visibleDestinations =
    activeCategory === "all"
      ? featured
      : featured.filter((d) => d.category?.includes(activeCategory));

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a1f2a 0%, #0d2535 40%, #0b1e2b 100%)",
        paddingTop: 100,
        paddingBottom: 120,
      }}
    >
      {/* ── Ambient background glows ─────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* top-left teal orb */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 600, height: 600,
            top: -100, left: -150,
            background: "radial-gradient(circle, rgba(15,61,77,0.55) 0%, transparent 65%)",
          }}
        />
        {/* top-right coral orb */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 500, height: 500,
            top: 0, right: -100,
            background: "radial-gradient(circle, rgba(226,87,43,0.22) 0%, transparent 65%)",
          }}
        />
        {/* bottom gold orb */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 700, height: 400,
            bottom: -80, left: "30%",
            background: "radial-gradient(ellipse, rgba(232,162,61,0.1) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ── Section header ───────────────────────────────────── */}
        <div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="h-px w-8"
                style={{ background: "linear-gradient(90deg, #E8A23D, transparent)" }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "#E8A23D" }}
              >
                Curated Collections
              </span>
            </div>
            <h2
              className="text-4xl font-bold sm:text-5xl"
              style={{
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontFamily: "var(--font-display)",
              }}
            >
              Signature
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #FBBF68 0%, #E8A23D 40%, #E2572B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Destinations
              </span>
            </h2>
          </div>

          <button
            className="group hidden sm:flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-all duration-300"
          >
            View All Destinations
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* ── Category filter pills ─────────────────────────────── */}
        <div
          className="mt-8 flex flex-wrap gap-2"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "none" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {destinationCategories.map((cat, i) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300"
                style={{
                  background: active
                    ? "linear-gradient(135deg, #E8A23D, #E2572B)"
                    : "rgba(255,255,255,0.06)",
                  border: active
                    ? "1px solid transparent"
                    : "1px solid rgba(255,255,255,0.12)",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.55)",
                  boxShadow: active
                    ? "0 4px 20px rgba(226,87,43,0.35)"
                    : "none",
                  transform: active ? "scale(1.04)" : "scale(1)",
                  animationDelay: `${i * 50}ms`,
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  }
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── AI Pick of the Day — cinematic hero card ─────────── */}
        {aiPick && (
          <div
            className="relative mt-10 overflow-hidden"
            style={{
              borderRadius: 24,
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "none" : "translateY(40px) scale(0.97)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              boxShadow: heroHovered
                ? "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,162,61,0.4)"
                : "0 24px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s, box-shadow 0.5s ease",
            }}
            onMouseEnter={() => setHeroHovered(true)}
            onMouseLeave={() => setHeroHovered(false)}
          >
            {/* Hero image — Ken Burns on hover */}
            <img
              src={aiPick.heroImage}
              alt={aiPick.name}
              className="h-[460px] w-full object-cover"
              style={{
                transform: heroHovered ? "scale(1.05)" : "scale(1.01)",
                transition: "transform 8s cubic-bezier(0.16,1,0.3,1)",
              }}
            />

            {/* Cinematic gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(5,16,22,0.92) 0%, rgba(5,16,22,0.55) 50%, rgba(5,16,22,0.2) 100%), " +
                  "linear-gradient(to top, rgba(5,16,22,0.95) 0%, transparent 60%)",
              }}
            />

            {/* Warm glow on hover */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 30% 100%, rgba(232,162,61,0.18) 0%, transparent 60%)",
                opacity: heroHovered ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            />

            {/* Subtle grid texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Floating map pin */}
            <div
              className="absolute top-8 right-8 z-20 flex flex-col items-center"
              style={{ animation: "pin-drop 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s both" }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(135deg, #E8A23D, #E2572B)",
                  boxShadow: "0 8px 24px rgba(226,87,43,0.5)",
                  animation: "soft-pulse 2.5s ease-in-out infinite",
                }}
              >
                <MapPin className="h-5 w-5 fill-white text-white" />
              </div>
              <div className="mt-1 h-4 w-0.5 bg-gradient-to-b from-[#E2572B]/60 to-transparent" />
              <div className="h-2 w-2 rounded-full bg-[#E2572B]/40" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 sm:p-12">
              {/* AI badge */}
              <div
                className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5"
                style={{
                  background: "linear-gradient(135deg, rgba(232,162,61,0.2), rgba(226,87,43,0.15))",
                  border: "1px solid rgba(232,162,61,0.4)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Sparkles
                  className="h-3.5 w-3.5 text-[#E8A23D]"
                  style={{ animation: "soft-pulse 1.8s ease-in-out infinite" }}
                />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E8A23D]">
                  AI Recommendation of the Day
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#E8A23D]"
                  style={{ animation: "soft-pulse 1.5s ease-in-out 0.4s infinite" }}
                />
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin className="h-3.5 w-3.5 text-white/40" />
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  {aiPick.region}, {aiPick.country}
                </span>
              </div>

              {/* Name */}
              <h3
                className="max-w-xl font-bold text-white"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-display)",
                  textShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                {aiPick.name}
                <span
                  className="block font-normal italic mt-1"
                  style={{ fontSize: "0.6em", color: "rgba(255,255,255,0.6)" }}
                >
                  {aiPick.tagline}
                </span>
              </h3>

              {/* Description */}
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-[0.95rem]">
                {aiPick.description}
              </p>

              {/* Meta row */}
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {aiPick.rating && (
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-[#E8A23D] text-[#E8A23D]" />
                    <span className="text-sm font-semibold text-white">{aiPick.rating}</span>
                    <span className="text-xs text-white/40">rating</span>
                  </div>
                )}
                {aiPick.bestSeason && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-white/40" />
                    <span className="text-xs text-white/50">Best: {aiPick.bestSeason}</span>
                  </div>
                )}
                {aiPick.priceTier && (
                  <span className="text-sm font-semibold text-[#E8A23D]">{aiPick.priceTier}</span>
                )}
              </div>

              {/* AI insight strip */}
              {aiPick.aiHighlight && (
                <div
                  className="mt-5 flex items-start gap-2.5 rounded-xl px-4 py-3 max-w-xl"
                  style={{
                    background: "rgba(232,162,61,0.1)",
                    border: "1px solid rgba(232,162,61,0.25)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#E8A23D]" />
                  <span className="text-sm leading-relaxed text-white/80">{aiPick.aiHighlight}</span>
                </div>
              )}

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button to="/planner" variant="accent" size="md">
                  Explore Itinerary
                </Button>
                <button
                  className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white/70 hover:text-white transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  Why You'll Love It
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Destination grid ─────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination, i) => (
            <div
              key={destination.id}
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible
                  ? "none"
                  : `translateY(48px) scale(0.93)`,
                transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${(i * 110) + 300}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${(i * 110) + 300}ms`,
              }}
            >
              <DestinationCard destination={destination} animationDelay={0} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {visibleDestinations.length === 0 && (
          <div
            className="mt-14 flex flex-col items-center gap-3 text-center"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <MapPin className="h-6 w-6 text-white/30" />
            </div>
            <p className="text-sm text-white/35 max-w-xs">
              No destinations match this category yet — check back as we craft more journeys.
            </p>
          </div>
        )}

        {/* ── Bottom CTA strip ─────────────────────────────────── */}
        <div
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
          }}
        >
          <div>
            <p className="text-base font-semibold text-white/85">
              Not seeing your dream destination?
            </p>
            <p className="mt-0.5 text-sm text-white/40">
              Our AI has mapped 120+ Indian destinations — tell it your vibe.
            </p>
          </div>
          <Button to="/planner" variant="gold" size="md">
            <Sparkles className="h-4 w-4 mr-1.5" />
            Craft My Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
