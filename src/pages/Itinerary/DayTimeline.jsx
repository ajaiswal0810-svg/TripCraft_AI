// src/pages/Itinerary/DayTimeline.jsx
import { useEffect, useRef, useState } from "react";
import { Footprints, Car, Sparkles } from "lucide-react";
import ActivityCard from "./ActivityCard";

const TRAVEL_ICON = { walk: Footprints, drive: Car };

const DayTimeline = ({ day }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [building, setBuilding] = useState(true);
  const prevDayRef = useRef(null);

  // Re-trigger build animation when day changes
  useEffect(() => {
    if (prevDayRef.current !== day?.dayNumber) {
      prevDayRef.current = day?.dayNumber;
      setVisibleCount(0);
      setBuilding(true);
    }
  }, [day?.dayNumber]);

  useEffect(() => {
    if (!building || !day) return;
    if (visibleCount >= day.activities.length) {
      setBuilding(false);
      return;
    }
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 350);
    return () => clearTimeout(t);
  }, [building, visibleCount, day]);

  if (!day) return null;

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E2572B]">
          Day {day.dayNumber}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-[#0F3D4D]">{day.title}</h2>
        <p className="mt-1 text-sm text-[#0F3D4D]/55">
          {day.dateLabel} · {day.location}
        </p>
      </div>

      {/* AI building indicator */}
      {building && (
        <div className="mb-5 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8A23D]/10 to-[#E2572B]/10 px-4 py-2 text-xs font-medium text-[#0F3D4D]/70 w-fit animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-[#E8A23D] animate-soft-pulse" />
          AI is building your itinerary...
          <span className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full bg-[#E8A23D]"
                style={{ animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </span>
        </div>
      )}

      <ol className="space-y-0">
        {day.activities.map((activity, index) => {
          const isLast = index === day.activities.length - 1;
          const TravelIcon = TRAVEL_ICON[activity.travelToNext?.mode];
          const isVisible = index < visibleCount;

          return (
            <li
              key={activity.id}
              className="relative flex gap-5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                transition: "opacity 0.5s var(--ease-out-soft), transform 0.5s var(--ease-out-soft)",
                maxHeight: isVisible ? "600px" : "0",
                overflow: isVisible ? "visible" : "hidden",
              }}
            >
              {/* Time rail */}
              <div className="flex w-16 shrink-0 flex-col items-center sm:w-20">
                <span className="pt-1 text-xs font-semibold text-[#0F3D4D]">{activity.time}</span>
                <span
                  className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#E2572B] bg-[#FDF6EE] transition-all duration-500"
                  style={{
                    boxShadow: isVisible ? "0 0 0 4px rgb(226 87 43 / 0.15)" : "none",
                  }}
                />
                {!isLast && (
                  <span
                    className="mt-1 w-px flex-1 transition-all duration-700"
                    style={{
                      background: isVisible
                        ? "linear-gradient(to bottom, rgb(226 87 43 / 0.4), rgb(15 61 77 / 0.15))"
                        : "transparent",
                    }}
                  />
                )}
              </div>

              {/* Card + travel connector */}
              <div className="flex-1 pb-8">
                <ActivityCard activity={activity} />

                {!isLast && activity.travelToNext && (
                  <div
                    className="mt-3 flex items-center gap-1.5 pl-1 text-xs font-medium text-[#0F3D4D]/50 transition-opacity duration-500"
                    style={{ opacity: isVisible ? 1 : 0 }}
                  >
                    {TravelIcon && <TravelIcon className="h-3.5 w-3.5" />}
                    {activity.travelToNext.duration}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default DayTimeline;
