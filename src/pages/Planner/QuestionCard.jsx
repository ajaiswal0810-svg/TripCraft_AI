// src/pages/Planner/QuestionCard.jsx
import { useEffect, useState } from "react";
import {
  Moon,
  Sparkles,
  Compass,
  Landmark,
  Heart,
  Utensils,
  Leaf,
  Building2,
  MoonStar,
  Trees,
  Palette,
  ScrollText,
  ShoppingBag,
  User,
  Users2,
  Users,
  UsersRound,
  MapPin,
  Clock,
} from "lucide-react";

// Maps the plain-string icon names stored in data/plannerQuestions.js to the
// actual lucide-react components used at render time.
const ICON_MAP = {
  moon: Moon,
  sparkles: Sparkles,
  compass: Compass,
  landmark: Landmark,
  heart: Heart,
  utensils: Utensils,
  leaf: Leaf,
  building: Building2,
  "moon-star": MoonStar,
  trees: Trees,
  palette: Palette,
  scroll: ScrollText,
  bag: ShoppingBag,
  user: User,
  "users-2": Users2,
  users: Users,
  "users-round": UsersRound,
};

const OptionIcon = ({ name, className }) => {
  const Icon = ICON_MAP[name];
  return Icon ? <Icon className={className} aria-hidden="true" /> : null;
};

/**
 * QuestionCard
 *
 * Renders a single question from data/plannerQuestions.js. The rendering
 * strategy branches on `question.type`; the parent (PlannerPage) owns all
 * state and simply passes `value` down and receives updates via `onChange`.
 *
 * Props:
 *  - question: an entry from data/plannerQuestions.js
 *  - value: the current answer for this question (shape depends on type)
 *  - onChange: (nextValue) => void
 */
const QuestionCard = ({ question, value, onChange }) => {
  const { type, heading, subheading } = question;

  return (
    <div className="w-full animate-[planner-card-rise_1.1s_var(--ease-out-soft)_both]">
      <h2 className="animate-[planner-heading-in_0.95s_var(--ease-out-soft)_both] text-2xl font-bold text-[#0F3D4D] sm:text-3xl">
        {heading}
      </h2>
      {subheading && <p className="mt-2 text-sm text-[#0F3D4D]/60 sm:text-base">{subheading}</p>}

      <div className="mt-8">
        {type === "search" && (
          <SearchQuestion question={question} value={value} onChange={onChange} />
        )}
        {type === "single-select" && (
          <SingleSelectQuestion question={question} value={value} onChange={onChange} />
        )}
        {type === "multi-select" && (
          <MultiSelectQuestion question={question} value={value} onChange={onChange} />
        )}
        {type === "slider" && (
          <SliderQuestion question={question} value={value} onChange={onChange} />
        )}
        {type === "date-range" && (
          <DateRangeQuestion value={value} onChange={onChange} />
        )}
      </div>
    </div>
  );
};

const SearchQuestion = ({ question, value, onChange }) => (
  <SearchQuestionAnimated question={question} value={value} onChange={onChange} />
);

const SearchQuestionAnimated = ({ question, value, onChange }) => {
  const [typedPlaceholder, setTypedPlaceholder] = useState("");

  useEffect(() => {
    const text = question.placeholder || "";
    setTypedPlaceholder("");

    if (!text) return undefined;

    let index = 0;
    const id = setInterval(() => {
      index += 1;
      setTypedPlaceholder(text.slice(0, index));
      if (index >= text.length) clearInterval(id);
    }, 24);

    return () => clearInterval(id);
  }, [question.placeholder, question.id]);

  return (
    <div className="space-y-5">
      <div className="origin-left animate-[search-expand_1.05s_var(--ease-out-soft)_both]">
        <div className="flex items-center gap-2 rounded-full border border-[#0F3D4D]/15 bg-white px-4 py-3 shadow-sm shadow-[#0F3D4D]/5">
      <Sparkles className="h-4 w-4 shrink-0 text-[#E8A23D]" />
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={value ? question.placeholder : typedPlaceholder || question.placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-[#0F3D4D] placeholder:text-[#0F3D4D]/40 focus:outline-none"
      />
        </div>
      </div>

      {question.trendingSuggestions?.length > 0 && (
        <div className="mt-1">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#0F3D4D]/50">
          Trending
        </p>
        <div className="flex flex-wrap gap-2">
          {question.trendingSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              style={{ animationDelay: `${question.trendingSuggestions.indexOf(s) * 140 + 240}ms` }}
              className={`animate-[chip-rise_0.8s_var(--ease-out-soft)_both] rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                value === s
                  ? "border-[#0F3D4D] bg-[#0F3D4D] text-white"
                  : "border-[#0F3D4D]/15 text-[#0F3D4D]/80 hover:border-[#0F3D4D]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        </div>
      )}

      {question.recentSearches?.length > 0 && (
        <div className="mt-1">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F3D4D]/50">
          <Clock className="h-3 w-3" /> Recent
        </p>
        <ul className="space-y-1.5">
          {question.recentSearches.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => onChange(s)}
                style={{ animationDelay: `${question.recentSearches.indexOf(s) * 140 + 700}ms` }}
                className="animate-[chip-rise_0.8s_var(--ease-out-soft)_both] flex items-center gap-1.5 text-xs italic text-[#0F3D4D]/70 hover:text-[#0F3D4D]"
              >
                <MapPin className="h-3 w-3 shrink-0" /> "{s}"
              </button>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

const SingleSelectQuestion = ({ question, value, onChange }) => (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    {question.options.map((option) => {
      const isActive = value === option.value;
      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
            isActive
              ? "border-[#0F3D4D] bg-[#0F3D4D] text-white"
              : "border-[#0F3D4D]/15 bg-white text-[#0F3D4D] hover:border-[#0F3D4D]/40"
          }`}
        >
          {option.icon && (
            <OptionIcon
              name={option.icon}
              className={`mt-0.5 h-5 w-5 shrink-0 ${isActive ? "text-[#E8A23D]" : "text-[#0F3D4D]/60"}`}
            />
          )}
          <span>
            <span className="block text-sm font-semibold">{option.label}</span>
            {option.description && (
              <span className={`mt-0.5 block text-xs ${isActive ? "text-white/75" : "text-[#0F3D4D]/55"}`}>
                {option.description}
              </span>
            )}
            {option.range && (
              <span className={`mt-0.5 block text-xs ${isActive ? "text-white/75" : "text-[#0F3D4D]/55"}`}>
                {option.range}
              </span>
            )}
          </span>
        </button>
      );
    })}
  </div>
);

const MultiSelectQuestion = ({ question, value, onChange }) => {
  const selected = Array.isArray(value) ? value : [];

  const toggle = (optValue) => {
    onChange(
      selected.includes(optValue)
        ? selected.filter((v) => v !== optValue)
        : [...selected, optValue]
    );
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      {question.options.map((option) => {
        const isActive = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "border-[#0F3D4D] bg-[#0F3D4D] text-white"
                : "border-[#0F3D4D]/15 bg-white text-[#0F3D4D]/80 hover:border-[#0F3D4D]/40"
            }`}
          >
            {option.icon && (
              <OptionIcon name={option.icon} className={`h-4 w-4 ${isActive ? "text-[#E8A23D]" : "text-[#0F3D4D]/50"}`} />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

const SliderQuestion = ({ question, value, onChange }) => {
  const current = value ?? question.default ?? question.min;

  return (
    <div>
      <input
        type="range"
        min={question.min}
        max={question.max}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#0F3D4D]/10 accent-[#0F3D4D]"
      />
      <div className="mt-3 flex items-center justify-between text-xs font-medium text-[#0F3D4D]/60">
        <span>{question.minLabel}</span>
        <span className="rounded-full bg-[#0F3D4D]/5 px-3 py-1 text-[#0F3D4D]">{current}</span>
        <span>{question.maxLabel}</span>
      </div>
    </div>
  );
};

const DateRangeQuestion = ({ value, onChange }) => {
  const range = value || { start: "", end: "" };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#0F3D4D]/50">
          Departing
        </span>
        <input
          type="date"
          value={range.start}
          onChange={(e) => onChange({ ...range, start: e.target.value })}
          className="w-full rounded-xl border border-[#0F3D4D]/15 bg-white px-4 py-3 text-sm text-[#0F3D4D] focus:border-[#0F3D4D] focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#0F3D4D]/50">
          Returning
        </span>
        <input
          type="date"
          value={range.end}
          onChange={(e) => onChange({ ...range, end: e.target.value })}
          className="w-full rounded-xl border border-[#0F3D4D]/15 bg-white px-4 py-3 text-sm text-[#0F3D4D] focus:border-[#0F3D4D] focus:outline-none"
        />
      </label>
    </div>
  );
};

export default QuestionCard;