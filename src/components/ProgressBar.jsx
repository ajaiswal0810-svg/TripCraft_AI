// src/components/ProgressBar.jsx

/**
 * ProgressBar
 *
 * Two modes:
 *  1. Continuous — a single track that fills to `value` (0-100). Used on the
 *     AIThinking "Crafting your Athens Escape" screen.
 *  2. Segmented — one pill per step, filled up to `currentStep`. Used in the
 *     multi-step Planner flow (QuestionCard.jsx).
 *
 * Props:
 *  - value: number (0-100) — required for continuous mode
 *  - steps: number — total step count, switches to segmented mode when provided
 *  - currentStep: number (1-indexed) — required in segmented mode
 *  - label: optional string shown above the bar
 *  - showPercent: boolean — show "42%" next to the label (continuous mode only)
 *  - tone: "dark" | "light" — controls track/fill contrast for dark hero sections
 */
const ProgressBar = ({
  value = 0,
  steps,
  currentStep = 1,
  label,
  showPercent = false,
  tone = "dark",
}) => {
  const isSegmented = Boolean(steps);

  const trackColor = tone === "light" ? "bg-[#FDF6EE]/25" : "bg-[#0F3D4D]/10";
  const fillColor = tone === "light" ? "bg-[#FDF6EE]" : "bg-[#0F3D4D]";
  const labelColor = tone === "light" ? "text-[#FDF6EE]/80" : "text-[#0F3D4D]/70";

  if (isSegmented) {
    return (
      <div className="w-full">
        {label && (
          <div className={`mb-2 flex items-center justify-between text-xs font-medium ${labelColor}`}>
            <span>{label}</span>
            <span>
              Step {currentStep} of {steps}
            </span>
          </div>
        )}
        <div className="flex gap-1.5">
          {Array.from({ length: steps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i < currentStep ? fillColor : trackColor
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className={`mb-2 flex items-center justify-between text-xs font-medium ${labelColor}`}>
          {label && <span>{label}</span>}
          {showPercent && <span>{Math.round(clamped)}%</span>}
        </div>
      )}
      <div className={`h-1.5 w-full overflow-hidden rounded-full ${trackColor}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${fillColor}`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;