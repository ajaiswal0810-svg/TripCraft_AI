// src/App.jsx
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppRouter from "./router/AppRouter";

const INTRO_SEEN_KEY = "tripcraft:intro-seen";

/**
 * IntroVideo
 *
 * Full-bleed cinematic played once before the landing page reveals itself —
 * the "India map with destination cards" sequence. Skippable, muted/autoplay
 * for browser compatibility, and only ever shown once per browser session.
 */
const IntroVideo = ({ onFinish }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay can be blocked in rare cases — fail open into the app
      // rather than stranding the user on a frozen frame.
      onFinish();
    });
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B2E3A]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/videos/India_map_with_destination_cards_202607011905.mp4"
        muted
        playsInline
        autoPlay
        onEnded={onFinish}
      />

      <button
        onClick={onFinish}
        className="absolute bottom-8 right-8 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white hover:text-white"
      >
        Skip intro
      </button>
    </motion.div>
  );
};

/**
 * App
 *
 * Gates the very first render behind the hero intro video, then hands off
 * to AppRouter for normal navigation. The intro only plays once per browser
 * session (sessionStorage), so route changes and reloads mid-session don't
 * replay it.
 */
const App = () => {
  const [showIntro, setShowIntro] = useState(
    () => typeof window !== "undefined" && !sessionStorage.getItem(INTRO_SEEN_KEY)
  );

  const finishIntro = () => {
    sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    setShowIntro(false);
  };

  return (
    <>
      <AnimatePresence>{showIntro && <IntroVideo onFinish={finishIntro} />}</AnimatePresence>
      {!showIntro && <AppRouter />}
    </>
  );
};

export default App;