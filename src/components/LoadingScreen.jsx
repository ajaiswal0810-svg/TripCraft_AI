// src/components/LoadingScreen.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import ProgressBar from "./ProgressBar";

/**
 * LoadingScreen
 *
 * The full-width "Crafting your Athens Escape" panel shown on AIThinkingPage
 * while the itinerary is generated. Cycles through a list of status messages
 * with a soft crossfade and drives a continuous progress bar underneath.
 *
 * Props:
 *  - title: e.g. "Crafting your Athens Escape"
 *  - messages: string[] — status lines cycled beneath the title, e.g.
 *      ["Finding hidden gastronomy...", "Checking real-time weather...",
 *       "Mapping optimal routes..."]
 *  - progress: number (0-100) — controlled from the parent as generation
 *    advances; if omitted, the bar animates indeterminately.
 *  - messageInterval: ms between message rotations (default 2200)
 */
const LoadingScreen = ({
  title = "Crafting your journey",
  messages = ["Gathering local insights...", "Balancing pace and rest...", "Finalizing your route..."],
  progress,
  messageInterval = 2200,
}) => {
  const [index, setIndex] = useState(0);
  const [internalProgress, setInternalProgress] = useState(12);

  // Cycle through status messages
  useEffect(() => {
    if (messages.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, messageInterval);
    return () => clearInterval(id);
  }, [messages, messageInterval]);

  // Indeterminate progress fallback when no controlled value is passed
  useEffect(() => {
    if (typeof progress === "number") return;
    const id = setInterval(() => {
      setInternalProgress((p) => (p >= 92 ? 92 : p + Math.random() * 6));
    }, 700);
    return () => clearInterval(id);
  }, [progress]);

  const displayedProgress = typeof progress === "number" ? progress : internalProgress;

  return (
    <div className="flex w-full flex-col items-center rounded-3xl bg-gradient-to-b from-[#BFE3F5] to-[#E4F3FA] px-8 py-16 text-center">
      <motion.span
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white/50"
        animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="h-6 w-6 text-[#0F3D4D]" aria-hidden="true" />
      </motion.span>

      <h2 className="mt-6 text-3xl font-semibold text-[#0F3D4D]">{title}</h2>

      <div className="mt-3 h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-sm text-[#0F3D4D]/70"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 w-full max-w-xs">
        <ProgressBar value={displayedProgress} tone="dark" />
      </div>
    </div>
  );
};

export default LoadingScreen;