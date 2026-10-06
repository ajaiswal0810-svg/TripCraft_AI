// src/components/DestinationCard.jsx
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Sparkles, MapPin, ArrowUpRight, Clock } from "lucide-react";

/**
 * DestinationCard
 *
 * Premium luxury travel card with:
 * - 3-D tilt on mouse move
 * - Animated gradient border ring on hover
 * - Image zoom + cinematic scrim transitions
 * - AI highlight strip (slides up on hover)
 * - Badge with animated shimmer
 * - Season & rating meta row
 */
const DestinationCard = ({
  destination,
  size = "md",
  variant = "default",
  animationDelay = 0,
}) => {
  if (!destination) return null;

  const {
    slug, name, country, region, tagline, badge,
    thumbnail, heroImage, rating, priceTier,
    bestSeason, aiHighlight, highlights,
  } = destination;

  const image = size === "lg" ? heroImage || thumbnail : thumbnail || heroImage;
  const isLarge = size === "lg";

  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <Link
      ref={cardRef}
      to="/planner"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A23D]"
      style={{
        height: isLarge ? 420 : 320,
        borderRadius: 20,
        animationDelay: `${animationDelay}ms`,
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(0)`,
        transition: hovered
          ? "transform 0.12s ease-out, box-shadow 0.4s ease"
          : "transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.55s ease",
        boxShadow: hovered
          ? "0 30px 70px rgba(15,61,77,0.32), 0 10px 30px rgba(226,87,43,0.18), 0 0 0 1px rgba(232,162,61,0.25)"
          : "0 6px 24px rgba(15,61,77,0.14), 0 2px 8px rgba(0,0,0,0.08)",
        willChange: "transform, box-shadow",
      }}
    >
      {/* ── Gradient border ring (hover) ───────────────────────── */}
      <div
        className="absolute inset-0 z-20 rounded-[20px] pointer-events-none"
        style={{
          padding: "1.5px",
          background: hovered
            ? "linear-gradient(135deg, rgba(232,162,61,0.8) 0%, rgba(226,87,43,0.6) 40%, rgba(255,255,255,0.1) 100%)"
            : "transparent",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          transition: "background 0.4s ease",
        }}
      />

      {/* ── Image ──────────────────────────────────────────────── */}
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transform: hovered ? "scale(1.09)" : "scale(1.01)",
          transition: "transform 0.75s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* ── Cinematic scrims ───────────────────────────────────── */}
      {/* Base scrim — always present */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(5,16,22,0.92) 0%, rgba(5,16,22,0.35) 50%, rgba(5,16,22,0.05) 100%)",
          transition: "opacity 0.4s ease",
        }}
      />
      {/* Hover warm glow scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 110%, rgba(232,162,61,0.22) 0%, transparent 65%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
      {/* Top-left vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 0% 0%, rgba(15,61,77,0.3) 0%, transparent 55%)",
        }}
      />

      {/* ── Badge ──────────────────────────────────────────────── */}
      {badge && (
        <div className="absolute left-4 top-4 z-30">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em]"
            style={{
              background: "rgba(253,246,238,0.12)",
              border: "1px solid rgba(253,246,238,0.25)",
              backdropFilter: "blur(10px)",
              color: "rgba(253,246,238,0.95)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#E8A23D]"
              style={{ animation: "soft-pulse 2s ease-in-out infinite" }}
            />
            {badge}
          </span>
        </div>
      )}

      {/* ── Rating pill ────────────────────────────────────────── */}
      {rating && (
        <div className="absolute right-4 top-4 z-30">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
            style={{
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <Star className="h-3 w-3 fill-[#E8A23D] text-[#E8A23D]" />
            {rating}
          </span>
        </div>
      )}

      {/* ── Main content ───────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 z-30 p-5 flex flex-col"
        style={{
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Location pill */}
        <div
          className="mb-2 flex items-center gap-1 self-start"
          style={{
            opacity: hovered ? 1 : 0.7,
            transition: "opacity 0.3s ease",
          }}
        >
          <MapPin className="h-3 w-3 text-[#E8A23D]" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/70">
            {region || country}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-bold text-white leading-tight"
          style={{
            fontSize: isLarge ? "1.75rem" : "1.25rem",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          {name}
        </h3>

        {/* Tagline */}
        <p
          className="mt-1 text-sm leading-snug text-white/65"
          style={{
            opacity: hovered ? 1 : 0.8,
            transition: "opacity 0.3s ease",
          }}
        >
          {tagline}
          {priceTier && (
            <span className="ml-2 text-[#E8A23D]/80 font-medium">{priceTier}</span>
          )}
        </p>

        {/* Season meta — slides up on hover */}
        {bestSeason && (
          <div
            className="mt-2 flex items-center gap-1.5"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s",
            }}
          >
            <Clock className="h-3 w-3 text-white/40 shrink-0" />
            <span className="text-[10px] text-white/50 uppercase tracking-wider font-medium">
              Best: {bestSeason}
            </span>
          </div>
        )}

        {/* AI highlight — slides up on hover */}
        {aiHighlight && (
          <div
            className="mt-3"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease 0.08s, transform 0.4s ease 0.08s",
            }}
          >
            <div
              className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs leading-relaxed text-white/85"
              style={{
                background: "rgba(232,162,61,0.12)",
                border: "1px solid rgba(232,162,61,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E8A23D]" />
              <span>{aiHighlight}</span>
            </div>
          </div>
        )}

        {/* Hover CTA arrow */}
        <div
          className="mt-3 flex items-center gap-1.5 self-start"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s",
          }}
        >
          <span
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{ color: "#E8A23D" }}
          >
            Craft this journey
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 text-[#E8A23D]" strokeWidth={2.5} />
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
