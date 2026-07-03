// src/pages/Itinerary/RouteMapPanel.jsx
import { useEffect, useRef, useState } from "react";
import { Car, Wallet, Sun, Droplets, Navigation2, Lightbulb } from "lucide-react";

const RouteMapPanel = ({ insights, weather, routeMap, tip }) => {
  const [routeDrawn, setRouteDrawn] = useState(false);
  const panelRef = useRef(null);

  const PIN_POSITIONS = [
    { cx: 80, cy: 60 },
    { cx: 200, cy: 110 },
    { cx: 130, cy: 175 },
  ];

  // Build SVG path through pins
  const routePath = PIN_POSITIONS.length >= 2
    ? PIN_POSITIONS.reduce((acc, p, i) => {
        if (i === 0) return `M ${p.cx} ${p.cy}`;
        const prev = PIN_POSITIONS[i - 1];
        const cpx = (prev.cx + p.cx) / 2;
        const cpy = prev.cy;
        return `${acc} Q ${cpx} ${cpy} ${p.cx} ${p.cy}`;
      }, "")
    : "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setRouteDrawn(true), 300); },
      { threshold: 0.3 }
    );
    if (panelRef.current) observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={panelRef} className="space-y-5">
      {/* Destination insights */}
      {insights && (
        <div className="rounded-2xl bg-white p-5 shadow-sm shadow-black/5 transition-shadow hover:shadow-md">
          <h3 className="text-sm font-semibold text-[#0F3D4D]">Destination Insights</h3>
          <div className="mt-4 space-y-3">
            {insights.preferredProvider && (
              <div className="flex items-start gap-3">
                <Car className="mt-0.5 h-4 w-4 shrink-0 text-[#0F3D4D]/50" />
                <div>
                  <p className="text-xs text-[#0F3D4D]/50">{insights.preferredProvider.label}</p>
                  <p className="text-sm font-medium text-[#0F3D4D]">{insights.preferredProvider.value}</p>
                </div>
              </div>
            )}
            {insights.currencyGuidance && (
              <div className="flex items-start gap-3">
                <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-[#0F3D4D]/50" />
                <div>
                  <p className="text-xs text-[#0F3D4D]/50">{insights.currencyGuidance.label}</p>
                  <p className="text-sm font-medium text-[#0F3D4D]">{insights.currencyGuidance.value}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Local weather — gradient card */}
      {weather && (
        <div
          className="rounded-2xl p-5 text-[#FDF6EE] animate-gradient-shift"
          style={{
            background: "linear-gradient(135deg, #0F3D4D 0%, #16515f 50%, #0b2e3a 100%)",
            backgroundSize: "200% 200%",
          }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Local Weather</p>
            <Sun className="h-4 w-4 text-[#E8A23D] animate-soft-pulse" />
          </div>
          <p className="mt-2 text-4xl font-bold">{weather.temperature}°</p>
          <p className="mt-1 text-sm text-white/70">{weather.condition}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
              <p className="flex items-center gap-1.5 text-[11px] text-white/60">
                <Droplets className="h-3 w-3" /> Humidity
              </p>
              <p className="mt-1 text-sm font-semibold">{weather.humidity}%</p>
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
              <p className="text-[11px] text-white/60">UV Index</p>
              <p className="mt-1 text-sm font-semibold">{weather.uvLabel} ({weather.uvIndex})</p>
            </div>
          </div>
        </div>
      )}

      {/* Animated route map */}
      {routeMap && (
        <div className="relative overflow-hidden rounded-2xl bg-[#DCEAE4] shadow-sm">
          {/* Map grid */}
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(#0F3D4D_1px,transparent_1px),linear-gradient(90deg,#0F3D4D_1px,transparent_1px)] [background-size:24px_24px]" />

          <svg
            viewBox="0 0 280 220"
            className="relative z-10 h-56 w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Animated route path */}
            <path
              d={routePath}
              stroke="#E2572B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1000"
              strokeDashoffset={routeDrawn ? 0 : 1000}
              style={{
                transition: "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",
                filter: "drop-shadow(0 0 4px rgb(226 87 43 / 0.5))",
              }}
            />

            {/* Animated dots along path */}
            {PIN_POSITIONS.map((pos, i) => (
              <g key={i}>
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r="14"
                  fill="rgb(226 87 43 / 0.15)"
                  style={{
                    opacity: routeDrawn ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.8 + i * 0.3}s`,
                  }}
                />
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r="6"
                  fill="#E2572B"
                  style={{
                    opacity: routeDrawn ? 1 : 0,
                    transform: routeDrawn ? "scale(1)" : "scale(0)",
                    transformOrigin: `${pos.cx}px ${pos.cy}px`,
                    transition: `opacity 0.3s ease ${0.7 + i * 0.3}s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.7 + i * 0.3}s`,
                  }}
                />
              </g>
            ))}

            {/* Pin labels */}
            {routeMap.pins.slice(0, 3).map((pin, i) => (
              <foreignObject
                key={pin.id}
                x={PIN_POSITIONS[i].cx - 40}
                y={PIN_POSITIONS[i].cy + 10}
                width="80"
                height="24"
                style={{
                  opacity: routeDrawn ? 1 : 0,
                  transition: `opacity 0.4s ease ${1 + i * 0.3}s`,
                }}
              >
                <div className="flex justify-center">
                  <span className="whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-medium text-[#0F3D4D] shadow-sm">
                    {pin.label}
                  </span>
                </div>
              </foreignObject>
            ))}
          </svg>

          <span className="absolute bottom-3 right-3 z-20 rounded-full bg-[#0F3D4D] px-3 py-1.5 text-xs font-medium text-white shadow-md">
            {routeMap.activitiesToday} activities today
          </span>
        </div>
      )}

      {/* AI tip */}
      {tip && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-dashed border-[#E8A23D]/40 bg-[#E8A23D]/5 p-4 transition-all hover:border-[#E8A23D]/70 hover:bg-[#E8A23D]/8">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#E8A23D]" />
          <p className="text-xs italic leading-relaxed text-[#0F3D4D]/70">"{tip.quote}"</p>
        </div>
      )}
    </div>
  );
};

export default RouteMapPanel;
