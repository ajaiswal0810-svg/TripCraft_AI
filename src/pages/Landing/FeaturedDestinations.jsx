// src/pages/Landing/FeaturedDestinations.jsx
import { useMemo, useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, MapPin } from "lucide-react";
import Button from "../../components/Button";
import DestinationCard from "../../components/DestinationCard";
import {
  destinationCategories,
  getFeaturedDestinations,
  getAiPickOfTheDay,
} from "../../data/destinations";

const FeaturedDestinations = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const aiPick = getAiPickOfTheDay();
  const featured = useMemo(
    () => getFeaturedDestinations().filter((d) => d.id !== aiPick?.id),
    [aiPick]
  );

  const visibleDestinations =
    activeCategory === "all"
      ? featured
      : featured.filter((d) => d.category?.includes(activeCategory));

  // Trigger card entrance when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden py-20 bg-[linear-gradient(180deg,rgba(240,225,204,1)_0%,rgba(253,246,238,1)_38%,rgba(224,240,236,1)_100%)] border-y border-[#0F3D4D]/10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(15,61,77,0.28)_0%,transparent_34%),radial-gradient(circle_at_top_right,rgba(226,87,43,0.24)_0%,transparent_30%),radial-gradient(circle_at_bottom_center,rgba(232,162,61,0.16)_0%,transparent_36%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-[-8rem] -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(15,61,77,0.36)_0%,rgba(15,61,77,0.12)_36%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6rem] top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(226,87,43,0.34)_0%,rgba(232,162,61,0.18)_34%,transparent_70%)] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E2572B]">
              Curated Collections
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#0F3D4D] sm:text-4xl">
              Signature Destinations
            </h2>
          </div>
          <button className="hidden items-center gap-1.5 text-sm font-medium text-[#0F3D4D]/70 transition-colors hover:text-[#0F3D4D] sm:flex">
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Category pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {destinationCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#0F3D4D] to-[#16515f] text-[#FDF6EE] shadow-md shadow-[#0F3D4D]/20"
                  : "bg-[#0F3D4D]/5 text-[#0F3D4D]/70 hover:bg-[#0F3D4D]/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* AI pick of the day — map-style hero */}
        {aiPick && (
          <div
            className="relative mt-10 overflow-hidden rounded-3xl border border-white/70 shadow-[0_24px_70px_rgba(15,61,77,0.18)] ring-1 ring-[#E2572B]/15 animate-card-enter"
            style={{ animationDelay: "100ms" }}
          >
            {/* Map grid overlay */}
            <div className="absolute inset-0 z-10 opacity-[0.06] [background-image:linear-gradient(#0F3D4D_1px,transparent_1px),linear-gradient(90deg,#0F3D4D_1px,transparent_1px)] [background-size:40px_40px]" />

            <img
              src={aiPick.heroImage}
              alt={aiPick.name}
              className="h-[420px] w-full object-cover transition-transform duration-[6s] ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Floating map pin */}
            <div className="absolute top-8 right-8 z-20 animate-pin-drop" style={{ animationDelay: "300ms" }}>
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2572B] shadow-lg shadow-[#E2572B]/40 animate-soft-pulse">
                  <MapPin className="h-5 w-5 fill-white text-white" />
                </div>
                <div className="mt-1 h-3 w-0.5 bg-[#E2572B]/60" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#E2572B]/40" />
              </div>
            </div>
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 sm:p-10">
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E2572B] to-[#E8A23D] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg">
                <Sparkles className="h-3 w-3" /> AI Recommendation of the Day
              </span>
              <h3 className="max-w-xl text-3xl font-bold text-white sm:text-4xl">
                {aiPick.name}: {aiPick.tagline}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                {aiPick.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/planner" variant="accent">Explore Itinerary</Button>
                <Button to="/planner" variant="outlineLight">Why You'll Love It</Button>
              </div>
            </div>
          </div>
        )}

        {/* Destination grid — cards animate onto "map" with stagger */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination, i) => (
            <div
              key={destination.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(40px) scale(0.92)",
                transition: `opacity 0.6s var(--ease-out-soft) ${i * 120}ms, transform 0.6s var(--ease-out-soft) ${i * 120}ms`,
              }}
            >
              <DestinationCard destination={destination} animationDelay={0} />
            </div>
          ))}
        </div>

        {visibleDestinations.length === 0 && (
          <p className="mt-10 text-center text-sm text-[#0F3D4D]/50">
            No destinations match this category yet — check back as we craft more journeys.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
