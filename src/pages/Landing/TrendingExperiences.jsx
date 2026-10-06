// src/pages/Landing/TrendingExperiences.jsx
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin, ArrowRight } from "lucide-react";

const EXPERIENCES = [
  {
    id: "exp-001",
    title: "Tea Plantation Gastronomy",
    location: "Munnar, Kerala",
    price: "₹12,500",
    rating: 4.8,
    badge: "Exclusive",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "exp-002",
    title: "Moonlight Backwater Cruise",
    location: "Alleppey, Kerala",
    price: "₹25,000",
    rating: 4.9,
    badge: "Signature",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop",
  },
  {
    id: "exp-003",
    title: "Stargazing in the Thar Desert",
    location: "Jaisalmer, Rajasthan",
    price: "₹18,000",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
  },
  {
    id: "exp-004",
    title: "Sunrise Yoga on the Ganges",
    location: "Rishikesh, Uttarakhand",
    price: "₹8,500",
    rating: 4.9,
    badge: "Wellness",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop",
  },
  {
    id: "exp-005",
    title: "Private Shikara at Dawn",
    location: "Srinagar, Kashmir",
    price: "₹15,000",
    rating: 4.8,
    badge: "Romantic",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "exp-006",
    title: "Amber Fort Sunrise Walk",
    location: "Jaipur, Rajasthan",
    price: "₹9,000",
    rating: 4.9,
    badge: "Heritage",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&auto=format&fit=crop",
  },
];

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

const TrendingExperiences = () => {
  const scrollerRef = useRef(null);
  const [sectionVisible, sectionRef] = useReveal();
  const [hoveredExp, setHoveredExp] = useState(null);

  const scrollBy = (dir) => {
    if (scrollerRef.current) {
      const cardWidth = 340 + 24; // width + gap
      scrollerRef.current.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      style={{
        background: "linear-gradient(180deg, #0b1e2b 0%, #071c24 100%)",
      }}
    >
      {/* ── Ambient glow ─────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[-10%] top-[20%] h-[500px] w-[500px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(232,162,61,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-[-5%] bottom-[-10%] h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(15,61,77,0.4) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(90deg, #E2572B, transparent)" }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "#E2572B" }}>
                Live the Moment
              </span>
            </div>
            <h2
              className="text-4xl font-bold text-white sm:text-5xl"
              style={{ letterSpacing: "-0.02em", fontFamily: "var(--font-display)" }}
            >
              Trending Experiences
            </h2>
          </div>

          <div className="hidden gap-3 sm:flex">
            <button
              onClick={() => scrollBy(-1)}
              className="group flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <ChevronLeft className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="group flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <ChevronRight className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollerRef}
          className="mt-12 flex gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "none" : "translateY(40px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          {EXPERIENCES.map((exp, i) => {
            const isHovered = hoveredExp === exp.id;
            return (
              <article
                key={exp.id}
                className="group relative w-[340px] shrink-0 snap-start overflow-hidden rounded-[24px]"
                onMouseEnter={() => setHoveredExp(exp.id)}
                onMouseLeave={() => setHoveredExp(null)}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isHovered
                    ? "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(232,162,61,0.3)"
                    : "0 10px 30px rgba(0,0,0,0.2)",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                }}
              >
                {/* Image Area */}
                <div className="relative h-[220px] w-full overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out"
                    style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071c24] via-transparent to-transparent opacity-80" />
                  
                  {/* Badge */}
                  {exp.badge && (
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
                      style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      {exp.badge}
                    </span>
                  )}

                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      background: "radial-gradient(circle at center, transparent 40%, rgba(226,87,43,0.15) 100%)",
                    }}
                  />
                </div>

                {/* Content Area */}
                <div className="relative p-6 pt-5 bg-[#071c24]">
                  {/* Ambient top border glow */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-white/50 mb-3">
                    <span className="flex items-center gap-1.5 transition-colors group-hover:text-white/70">
                      <MapPin className="h-3 w-3 text-[#E2572B]" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1 text-white/90">
                      <Star className="h-3 w-3 fill-[#E8A23D] text-[#E8A23D]" />
                      {exp.rating}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-tight mb-2 transition-colors group-hover:text-[#E8A23D]">
                    {exp.title}
                  </h3>

                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">From</p>
                      <p className="text-lg font-semibold text-white/90">{exp.price}</p>
                    </div>
                    
                    <button
                      className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        background: isHovered ? "linear-gradient(135deg, #E8A23D, #E2572B)" : "rgba(255,255,255,0.05)",
                        border: isHovered ? "none" : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: isHovered ? "0 4px 12px rgba(226,87,43,0.4)" : "none",
                      }}
                    >
                      <ArrowRight className={`h-4 w-4 ${isHovered ? 'text-white' : 'text-white/50'}`} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingExperiences;