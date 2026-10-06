// src/pages/Planner/PlannerPage.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import ProgressBar from "../../components/ProgressBar";
import QuestionCard from "./QuestionCard";
import plannerQuestions, { totalPlannerSteps } from "../../data/plannerQuestions";

const PlannerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(() =>
    location.state?.query ? { destination: location.state.query } : {}
  );
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);

  const currentQuestion = plannerQuestions[step];
  const isFirstStep = step === 0;
  const isLastStep = step === totalPlannerSteps - 1;

  const handleChange = (nextValue) =>
    setAnswers((prev) => ({ ...prev, [currentQuestion.key]: nextValue }));

  const transition = (fn) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { fn(); setAnimating(false); }, 280);
  };

  const handleBack = () => {
    if (!isFirstStep) { setDirection(-1); transition(() => setStep((s) => s - 1)); }
  };

  const handleNext = () => {
    if (isLastStep) { navigate("/crafting", { state: { answers } }); return; }
    setDirection(1);
    transition(() => setStep((s) => s + 1));
  };

  return (
    <div className="planner-page relative isolate min-h-[calc(100vh-73px)] overflow-hidden">
      <div className="planner-scene pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="planner-map-contours pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Sparse particles give the scene depth without competing with the form. */}
      <div className="pointer-events-none absolute inset-0">
        {[
          "left-[12%] top-[20%] h-1 w-1",
          "left-[26%] top-[36%] h-1.5 w-1.5",
          "right-[20%] top-[24%] h-1 w-1",
          "right-[12%] top-[56%] h-1.5 w-1.5",
        ].map((position, index) => (
          <span
            key={index}
            className={`absolute rounded-full bg-[#E8A23D]/45 animate-[particle-float_12s_ease-in-out_infinite] ${position}`}
            style={{ animationDelay: `${index * 1.8}s` }}
          />
        ))}
      </div>

      {/* Card */}
      <div className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-3xl flex-col justify-center px-5 py-12 sm:px-6">
        <div className="mb-7 text-center">
          <p className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E2572B]">
            <Sparkles className="h-3.5 w-3.5" /> AI Planner
          </p>
          <p className="mt-2 text-xs text-[#0F3D4D]/55">A journey shaped around how you want to feel.</p>
        </div>
        <div
          key={currentQuestion.id}
          className="planner-shell rounded-3xl p-6 sm:p-9 animate-[planner-card-rise_0.65s_var(--ease-out-soft)_both]"
        >
          <ProgressBar steps={totalPlannerSteps} currentStep={step + 1} />

          {/* Question — slides in/out */}
          <div
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? `translateX(${direction * 28}px)` : "translateX(0)",
              transition: "opacity 0.28s ease, transform 0.28s ease",
            }}
          >
            {/* QuestionCard renders with its own teal-on-cream colours — no overrides needed */}
            <QuestionCard
              question={currentQuestion}
              value={answers[currentQuestion.key]}
              onChange={handleChange}
            />
          </div>

          {/* Nav */}
          <div className="mt-9 flex items-center justify-between border-t border-[#0F3D4D]/10 pt-6">
            <button
              onClick={handleBack}
              disabled={isFirstStep}
              className="planner-back-button flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#0F3D4D]/60 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              className="planner-next-button flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white"
            >
              {isLastStep ? "Craft My Journey" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;
