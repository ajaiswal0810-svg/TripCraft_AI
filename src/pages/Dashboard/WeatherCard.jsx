// src/pages/Dashboard/WeatherCard.jsx
import { Sun, Cloud, CloudRain } from "lucide-react";

const WEATHER_ICON = { sun: Sun, cloud: Cloud, rain: CloudRain };

/**
 * WeatherCard
 *
 * Compact forecast strip — today's condition plus the next two days.
 *
 * Props:
 *  - weather: dashboardMock.weather
 */
const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const HeroIcon = WEATHER_ICON[weather.condition] || Sun;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm shadow-black/5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#0F3D4D]">Weather</h3>
        <HeroIcon className="h-5 w-5 text-[#E8A23D]" />
      </div>
      <p className="mt-1 text-xs text-[#0F3D4D]/50">{weather.location}</p>

      <div className="mt-4 space-y-2.5">
        {weather.forecast.map((day) => {
          const DayIcon = WEATHER_ICON[day.icon] || Sun;
          return (
            <div key={day.day} className="flex items-center justify-between text-sm">
              <span className="w-12 font-medium text-[#0F3D4D]/60">{day.day}</span>
              <span className="text-base font-semibold text-[#0F3D4D]">{day.temp}°</span>
              <DayIcon className="h-4 w-4 text-[#E8A23D]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherCard;