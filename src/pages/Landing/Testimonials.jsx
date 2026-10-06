// src/pages/Landing/Testimonials.jsx
import { useRef, useState, useEffect } from "react";
import { Quote, Star } from "lucide-react";
import { getFeaturedTestimonials } from "../../data/testimonials";

/* ── Staggered reveal hook ─────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
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

const Testimonials = () => {
  const testimonials = getFeaturedTestimonials();
  const [sectionVisible, sectionRef] = useReveal();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28"
      style={{
        background: "linear-gradient(180deg, #06161c 0%, #051116 100%)",
      }}
    >
      {/* ── Ambient background textures ─────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-[800px] w-[1000px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(15,61,77,0.25) 0%, transparent 60%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className="text-center flex flex-col items-center"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#E8A23D]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8A23D]">
              Trusted by Explorers
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#E8A23D]" />
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-5xl max-w-2xl font-display leading-[1.15]">
            Voices of the Modern Explorer
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] p-8"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? "none" : "translateY(40px)",
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 120 + 200}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(232,162,61,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
              }}
            >
              {/* Subtle hover gradient */}
              <div className="absolute -inset-[1px] rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(232,162,61,0.1), transparent 60%)" }} />

              <div className="relative z-10">
                <Quote className="h-6 w-6 text-[#E8A23D] opacity-80" aria-hidden="true" />
                <blockquote className="mt-5 text-[15px] leading-relaxed text-white/80">
                  "{t.quote}"
                </blockquote>
              </div>

              <figcaption className="relative z-10 mt-8 flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="relative">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white/10"
                  />
                  {/* Rating badge attached to avatar */}
                  <div className="absolute -bottom-1 -right-2 flex items-center gap-0.5 rounded-full bg-[#0F3D4D] border border-white/20 px-1.5 py-0.5 shadow-sm">
                    <Star className="h-2.5 w-2.5 fill-[#E8A23D] text-[#E8A23D]" />
                    <span className="text-[9px] font-bold text-white">{t.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/50 mt-0.5">{t.title}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;