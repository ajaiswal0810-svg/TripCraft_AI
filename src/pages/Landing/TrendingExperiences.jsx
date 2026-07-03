// src/pages/Landing/TrendingExperiences.jsx
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";

// No dedicated data module exists for bookable experiences yet — kept local
// to this section until a data/experiences.js is introduced.
const EXPERIENCES = [
  {
    id: "exp-001",
    title: "Tea Plantation Gastronomy",
    location: "Munnar, Kerala",
    price: "₹12,500",
    rating: 4.8,
    badge: "Exclusive",
    // Munnar tea estates Kerala
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "exp-002",
    title: "Moonlight Backwater Cruise",
    location: "Alleppey, Kerala",
    price: "₹25,000",
    rating: 4.9,
    badge: "Exclusive",
    // Kerala backwaters houseboat
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&auto=format&fit=crop",
  },
  {
    id: "exp-003",
    title: "Stargazing in the Thar Desert",
    location: "Jaisalmer, Rajasthan",
    price: "₹18,000",
    rating: 4.7,
    // Desert night sky / Thar dunes
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop",
  },
  {
    id: "exp-004",
    title: "Sunrise Yoga on the Ganges",
    location: "Rishikesh, Uttarakhand",
    price: "₹8,500",
    rating: 4.9,
    badge: "Exclusive",
    // Rishikesh Ganges yoga
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop",
  },
  {
    id: "exp-005",
    title: "Private Shikara at Dawn",
    location: "Srinagar, Kashmir",
    price: "₹15,000",
    rating: 4.8,
    // Dal Lake shikara Kashmir
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "exp-006",
    title: "Amber Fort Sunrise Walk",
    location: "Jaipur, Rajasthan",
    price: "₹9,000",
    rating: 4.9,
    badge: "Exclusive",
    // Amber Fort Jaipur
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&auto=format&fit=crop",
  },
];

/**
 * TrendingExperiences
 *
 * "Live the Moment" horizontal carousel of bookable experiences, scrolled
 * with the two chevron controls rather than a full slider library.
 */
const TrendingExperiences = () => {
  const scrollerRef = useRef(null);

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="relative isolate overflow-hidden py-20 bg-[linear-gradient(180deg,rgba(240,225,204,1)_0%,rgba(253,246,238,1)_42%,rgba(223,238,234,1)_100%)] border-y border-[#0F3D4D]/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_left_top,rgba(232,162,61,0.34)_0%,transparent_30%),radial-gradient(circle_at_right_center,rgba(15,61,77,0.26)_0%,transparent_34%),radial-gradient(circle_at_bottom_left,rgba(226,87,43,0.16)_0%,transparent_28%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-7rem] top-10 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(232,162,61,0.4)_0%,rgba(232,162,61,0.18)_34%,transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8rem] bottom-[-5rem] -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(15,61,77,0.3)_0%,rgba(15,61,77,0.12)_36%,transparent_72%)] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E2572B]">
              Live the Moment
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#0F3D4D] sm:text-4xl">
              Trending Experiences
            </h2>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0F3D4D]/15 text-[#0F3D4D] transition-colors hover:bg-[#0F3D4D]/5"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0F3D4D]/15 text-[#0F3D4D] transition-colors hover:bg-[#0F3D4D]/5"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-8 flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {EXPERIENCES.map((exp) => (
            <article
              key={exp.id}
              className="w-[300px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-md shadow-black/8 ring-1 ring-white/80"
            >
              <div className="relative h-44 w-full">
                <img src={exp.image} alt={exp.title} className="h-full w-full object-cover" />
                {exp.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#0F3D4D] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {exp.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-[#0F3D4D]/50">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {exp.location}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-[#0F3D4D]">
                    <Star className="h-3 w-3 fill-[#E8A23D] text-[#E8A23D]" /> {exp.rating}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-[#0F3D4D]">{exp.title}</h3>
                <p className="mt-1 text-sm text-[#0F3D4D]/60">{exp.price} per person</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingExperiences;