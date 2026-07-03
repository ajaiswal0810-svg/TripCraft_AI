// src/pages/Dashboard/ReadinessRing.jsx

/**
 * ReadinessRing
 *
 * The "You're almost ready for {destination}" banner — a circular SVG
 * progress ring showing the readiness percentage, paired with the headline
 * and supporting copy from dashboardMock.js.
 *
 * Props:
 *  - percent: number (0-100)
 *  - headline: e.g. "You're almost ready for Positano"
 *  - description: supporting sentence
 */
const ReadinessRing = ({ percent = 0, headline, description }) => {
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, percent) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-8 rounded-3xl bg-[#F7ECDD] p-8 sm:flex-row sm:justify-between">
      <div className="text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E2572B]">
          Travel Readiness
        </p>
        <h2 className="mt-2 max-w-md text-2xl font-bold text-[#0F3D4D] sm:text-3xl">{headline}</h2>
        {description && (
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#0F3D4D]/65">{description}</p>
        )}
      </div>

      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#0F3D4D1A"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#0F3D4D"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[#0F3D4D]">{Math.round(percent)}%</span>
          <span className="text-[11px] uppercase tracking-wider text-[#0F3D4D]/50">Ready</span>
        </div>
      </div>
    </div>
  );
};

export default ReadinessRing;