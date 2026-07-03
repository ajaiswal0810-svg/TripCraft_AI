// src/pages/Dashboard/RecommendationsCard.jsx
import { Star, ArrowRight } from "lucide-react";

/**
 * RecommendationsCard
 *
 * "Recommended for You" section — curated experience tiles surfaced from
 * the trip's saved interests.
 *
 * Props:
 *  - recommendations: dashboardMock.recommendations
 */
const RecommendationsCard = ({ recommendations }) => {
  if (!recommendations) return null;

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#0F3D4D]">{recommendations.heading}</h3>
          <p className="mt-1 text-sm text-[#0F3D4D]/55">{recommendations.subheading}</p>
        </div>
        <button className="hidden items-center gap-1 text-sm font-medium text-[#0F3D4D]/70 hover:text-[#0F3D4D] sm:flex">
          See All <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {recommendations.items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5">
            <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium uppercase tracking-wide text-[#E2572B]">
                  {item.category}
                </span>
                <span className="flex items-center gap-1 font-medium text-[#0F3D4D]">
                  <Star className="h-3 w-3 fill-[#E8A23D] text-[#E8A23D]" /> {item.rating}
                </span>
              </div>
              <h4 className="mt-2 text-sm font-semibold text-[#0F3D4D]">{item.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-[#0F3D4D]/60">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsCard;