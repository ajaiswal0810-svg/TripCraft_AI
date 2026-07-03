// src/components/DestinationCard.jsx
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Sparkles } from "lucide-react";

const DestinationCard = ({ destination, size = "md", variant = "default", animationDelay = 0 }) => {
  if (!destination) return null;

  const { slug, name, country, tagline, badge, thumbnail, heroImage, rating, priceTier } = destination;
  const image = size === "lg" ? heroImage || thumbnail : thumbnail || heroImage;
  const height = size === "lg" ? "h-[420px]" : "h-72";

  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
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
      className={`group relative block ${height} w-full overflow-hidden rounded-2xl bg-[#0F3D4D] animate-card-enter`}
      style={{
        animationDelay: `${animationDelay}ms`,
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: hovered
          ? "transform 0.1s ease-out, box-shadow 0.3s ease-out"
          : "transform 0.5s var(--ease-out-soft), box-shadow 0.5s ease-out",
        boxShadow: hovered
          ? "0 24px 60px rgb(15 61 77 / 0.28), 0 8px 24px rgb(226 87 43 / 0.15)"
          : "0 4px 16px rgb(15 61 77 / 0.1)",
      }}
    >
      {/* Animated gradient border on hover */}
      <div
        className="absolute inset-0 rounded-2xl z-10 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: "linear-gradient(135deg, rgb(232 162 61 / 0.6), rgb(226 87 43 / 0.4), transparent 60%)",
          padding: "1.5px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Image with zoom */}
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Gradient glow overlay on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: "radial-gradient(ellipse at 50% 100%, rgb(232 162 61 / 0.2) 0%, transparent 70%)",
        }}
      />

      {/* Badge */}
      {badge && (
        <span className="absolute left-4 top-4 z-20 rounded-full bg-[#FDF6EE]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0F3D4D] shadow-sm">
          {badge}
        </span>
      )}

      {/* Rating */}
      {variant === "default" && rating && (
        <span className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <Star className="h-3 w-3 fill-[#E8A23D] text-[#E8A23D]" />
          {rating}
        </span>
      )}

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-1 p-5 transition-transform duration-300 group-hover:-translate-y-1">
        <h3 className={`font-bold text-white drop-shadow-sm ${size === "lg" ? "text-3xl" : "text-xl"}`}>
          {name}
        </h3>
        <p className="text-sm text-white/75">
          {tagline || country}
          {priceTier ? ` · ${priceTier}` : ""}
        </p>

        {variant === "default" && size === "lg" && destination.description && (
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">{destination.description}</p>
        )}

        {variant === "default" && size === "lg" && destination.aiHighlight && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs text-white/90 backdrop-blur-sm">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E8A23D]" />
            <span>{destination.aiHighlight}</span>
          </div>
        )}

        {/* Hover CTA */}
        <div
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#E8A23D] transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)" }}
        >
          <Sparkles className="h-3 w-3" />
          Craft this journey →
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
