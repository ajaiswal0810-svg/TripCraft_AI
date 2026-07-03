// src/pages/Planner/PlannerPage.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import ProgressBar from "../../components/ProgressBar";
import QuestionCard from "./QuestionCard";
import plannerQuestions, { totalPlannerSteps } from "../../data/plannerQuestions";

// Subtle warm-cream background — keeps text fully legible
const BG_GRADIENTS = [
  "from-[#fdf6ee] via-[#f7ecdd] to-[#fdf6ee]",
  "from-[#f7ecdd] via-[#fdf6ee] to-[#f0e4d0]",
  "from-[#fdf6ee] via-[#f0e4d0] to-[#f7ecdd]",
];

const PlannerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const incomingQuery = location.state?.query;
    if (incomingQuery) setAnswers((prev) => ({ ...prev, destination: incomingQuery }));
  }, [location.state]);

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
    <div className="relative isolate min-h-[calc(100vh-73px)] overflow-hidden">
      {/* Animated sunrise atmosphere */}
      <div className={`absolute inset-0 bg-[length:200%_200%] bg-gradient-to-br ${BG_GRADIENTS[step % BG_GRADIENTS.length]} animate-[gradient-pan_30s_ease-in-out_infinite] transition-all duration-700`} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,225,160,0.82)_0%,rgba(255,203,128,0.42)_18%,rgba(255,255,255,0)_42%)] opacity-90 animate-[gradient-shift_12s_ease_in-out_infinite]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_22%,rgba(255,255,255,0.08)_100%)]" />

      {/* Drifting clouds */}
      <div className="pointer-events-none absolute left-[-15%] top-14 h-24 w-72 rounded-full bg-white/35 blur-3xl animate-[cloud-drift_48s_linear_infinite]" />
      <div className="pointer-events-none absolute left-[18%] top-24 h-20 w-64 rounded-full bg-white/28 blur-3xl animate-[cloud-drift_58s_linear_infinite]" />
      <div className="pointer-events-none absolute right-[-18%] top-20 h-28 w-80 rounded-full bg-white/22 blur-3xl animate-[cloud-drift_52s_linear_infinite_reverse]" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {[
          "left-[10%] top-[18%] h-1.5 w-1.5",
          "left-[22%] top-[30%] h-2 w-2",
          "left-[38%] top-[16%] h-1 w-1",
          "right-[18%] top-[22%] h-2 w-2",
          "right-[28%] top-[34%] h-1.5 w-1.5",
          "left-[55%] top-[14%] h-1 w-1",
          "left-[66%] top-[28%] h-2 w-2",
          "right-[10%] top-[16%] h-1.5 w-1.5",
        ].map((position, index) => (
          <span
            key={index}
            className={`absolute rounded-full bg-white/55 shadow-[0_0_14px_rgba(255,255,255,0.35)] animate-[particle-float_14s_ease-in-out_infinite] ${position}`}
            style={{ animationDelay: `${index * 1.4}s` }}
          />
        ))}
      </div>

      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute -top-20 right-[5%] h-96 w-96 rounded-full bg-[#E8A23D]/16 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-0 left-[5%] h-72 w-72 rounded-full bg-[#E2572B]/14 blur-3xl animate-float [animation-delay:2s]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F3D4D]/6 blur-3xl" />

      {/* Mountains / horizon */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden">
        <div className="absolute left-[-12%] bottom-[-5rem] h-72 w-[34rem] rotate-[-6deg] rounded-[45%_55%_0_0] bg-gradient-to-t from-[#0B2E3A] via-[#123e4b] to-[#1a5a68] opacity-90 shadow-[0_-20px_70px_rgba(11,46,58,0.22)]" />
        <div className="absolute left-[22%] bottom-[-4.5rem] h-80 w-[42rem] rotate-[3deg] rounded-[52%_48%_0_0] bg-gradient-to-t from-[#153f4d] via-[#1a5564] to-[#2c7080] opacity-80 shadow-[0_-20px_70px_rgba(11,46,58,0.18)]" />
        <div className="absolute right-[-10%] bottom-[-5.5rem] h-72 w-[32rem] rotate-[8deg] rounded-[48%_52%_0_0] bg-gradient-to-t from-[#0e3441] via-[#184858] to-[#2d6d7b] opacity-85 shadow-[0_-20px_70px_rgba(11,46,58,0.2)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(253,246,238,0)_0%,rgba(253,246,238,0.18)_100%)]" />
      </div>

      {/* Step counter strip at top */}
      <div className="relative flex items-center justify-center gap-2 pt-8 text-xs font-semibold uppercase tracking-widest text-[#E2572B]">
        <Sparkles className="h-3.5 w-3.5 animate-soft-pulse" />
        AI Planner · Step {step + 1} of {totalPlannerSteps}
      </div>

      {/* Card */}
      <div className="relative mx-auto flex min-h-[calc(100vh-120px)] max-w-2xl flex-col justify-center px-6 pb-16">
        <div
          key={currentQuestion.id}
          className="rounded-3xl border border-[#0F3D4D]/10 bg-white/82 p-8 shadow-xl shadow-[#0F3D4D]/8 animate-[planner-card-rise_1.1s_var(--ease-out-soft)_both]"
          style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          {/* Gradient accent bar */}
          <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-[#0F3D4D]/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#E2572B] to-[#E8A23D] transition-all duration-500"
              style={{ width: `${((step + 1) / totalPlannerSteps) * 100}%` }}
            />
          </div>

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
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={isFirstStep}
              className="flex items-center gap-2 rounded-full border border-[#0F3D4D]/20 px-5 py-2.5 text-sm font-medium text-[#0F3D4D]/60 transition-all hover:border-[#0F3D4D]/40 hover:text-[#0F3D4D] disabled:cursor-not-allowed disabled:opacity-30 animate-[planner-button-in_1s_var(--ease-out-soft)_both]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E2572B] to-[#E8A23D] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#E2572B]/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#E2572B]/35 animate-[planner-button-in_1s_var(--ease-out-soft)_both]"
              style={{ animationDelay: "420ms" }}
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
