// src/pages/Itinerary/ActivityCard.jsx
import { Sun, Utensils, Moon, Waves, Mountain, Landmark, Sparkles, CheckCircle2, Wallet, Clock } from "lucide-react";

// Maps the plain-string icon names stored in data/itineraryMock.js activities
// to actual lucide-react components.
const ICON_MAP = {
  sun: Sun,
  utensils: Utensils,
  moon: Moon,
  waves: Waves,
  mountain: Mountain,
  landmark: Landmark,
};

const PERIOD_STYLES = {
  Morning: "bg-[#E8A23D]/15 text-[#B77A1F]",
  Afternoon: "bg-[#E2572B]/15 text-[#E2572B]",
  Evening: "bg-[#0F3D4D]/10 text-[#0F3D4D]",
};

/**
 * ActivityCard
 *
 * Renders a single activity within a day's timeline — image, period badge,
 * description, AI recommendation callout, and a meta row that adapts to
 * whichever fields the activity actually has (weather+budget+duration,
 * transport+budget+alert, or weather+budget+host).
 *
 * Props:
 *  - activity: an entry from a day's `activities` array in itineraryMock.js
 */
const ActivityCard = ({ activity }) => {
  const Icon = ICON_MAP[activity.icon] || Sun;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0F3D4D]/12">
      <div className="relative h-44 w-full sm:h-48 overflow-hidden">
        <img src={activity.image} alt={activity.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        {activity.period && (
          <span
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold ${
              PERIOD_STYLES[activity.period] || "bg-white/90 text-[#0F3D4D]"
            }`}
          >
            {activity.period}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start gap-2">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0F3D4D]/50" />
          <h3 className="text-lg font-semibold text-[#0F3D4D]">{activity.title}</h3>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-[#0F3D4D]/65">{activity.description}</p>

        {activity.aiRecommendation && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#E8A23D]/10 px-3 py-2.5 text-xs text-[#0F3D4D]/80">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E8A23D]" />
            <span>
              <span className="font-semibold">AI Recommendation:</span> {activity.aiRecommendation}
            </span>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#0F3D4D]/10 pt-4 text-xs text-[#0F3D4D]/60">
          {activity.weather && (
            <span className="flex items-center gap-1.5">
              <Sun className="h-3.5 w-3.5" />
              {activity.weather.temp}°{activity.weather.unit}
            </span>
          )}
          {activity.transport && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {activity.transport}
            </span>
          )}
          {activity.budget && (
            <span className="flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5" />
              {activity.budget}
            </span>
          )}
          {activity.duration && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {activity.duration}
            </span>
          )}
          {activity.host && <span>Host: {activity.host}</span>}
          {activity.alert && (
            <span className="flex items-center gap-1.5 font-medium text-[#1F8A5F]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {activity.alert.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;