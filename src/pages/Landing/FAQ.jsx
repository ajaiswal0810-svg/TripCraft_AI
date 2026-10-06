// src/pages/Landing/FAQ.jsx
import { useState, useRef, useEffect } from "react";
import { Plus, Minus, MessageCircle, ArrowRight } from "lucide-react";
import Button from "../../components/Button";

const FAQ_ITEMS = [
  {
    id: "vibe",
    question: "How does the AI understand my 'Vibe'?",
    answer:
      "TripCraft's planner reads the mood, pace, and interests you select and cross-references them against real-time weather, crowd, and seasonal data — so every suggestion is grounded in what's actually happening at your destination, not just a static template.",
  },
  {
    id: "modify",
    question: "Can I modify the AI's suggestions?",
    answer:
      "Yes. Every day in your itinerary is editable — swap activities, adjust timing, or ask the AI to refine an entire day around a new preference. Your changes retrain the recommendations for the rest of the trip.",
  },
  {
    id: "exclusive",
    question: "What about exclusive access?",
    answer:
      "Elite Concierge members get priority reservations at fully booked restaurants and experiences, plus after-hours access to select heritage sites through our on-the-ground partners.",
  },
];

/* ── Reveal hook ───────────────────────────────────────────────────────── */
function useReveal(threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [visible, ref];
}

const FAQ = () => {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id);
  const [faqVisible, faqRef] = useReveal();
  const [ctaVisible, ctaRef] = useReveal(0.3);

  return (
    <>
      <section
        ref={faqRef}
        className="relative py-28"
        style={{
          background: "linear-gradient(180deg, #051116 0%, #071c24 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <div
            className="text-center"
            style={{
              opacity: faqVisible ? 1 : 0,
              transform: faqVisible ? "none" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-5xl font-display">Inquiries</h2>
            <p className="mt-4 text-sm text-white/50 uppercase tracking-widest font-semibold">Common questions</p>
          </div>

          <div
            className="mt-14 space-y-4"
            style={{
              opacity: faqVisible ? 1 : 0,
              transform: faqVisible ? "none" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl transition-all duration-500 overflow-hidden"
                  style={{
                    background: isOpen ? "rgba(255,255,255,0.04)" : "transparent",
                    border: isOpen ? "1px solid rgba(232,162,61,0.2)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="text-base font-medium transition-colors duration-300"
                      style={{ color: isOpen ? "#E8A23D" : "rgba(255,255,255,0.85)" }}
                    >
                      {item.question}
                    </span>
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        background: isOpen ? "rgba(232,162,61,0.15)" : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-[#E8A23D]" />
                      ) : (
                        <Plus className="h-4 w-4 text-white/50 group-hover:text-white" />
                      )}
                    </div>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: isOpen ? 200 : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-white/60">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Closing CTA band ─────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="closing-cta relative overflow-hidden py-20 text-center sm:py-24"
      >
        <div
          className="closing-cta-content relative mx-auto w-full max-w-2xl px-6"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "scale(1)" : "scale(0.95)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h2 className="text-balance text-4xl font-bold text-white sm:text-6xl font-display tracking-tight leading-[1.06]">
            Your next story is waiting.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65">
            Experience travel that transcends the map. Join the elite group of explorers who have traded stress for serendipity.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              to="/planner"
              size="lg"
              className="closing-cta-primary w-full sm:w-auto"
              style={{
                background: "#E2572B",
                border: "none",
                boxShadow: "0 8px 20px rgba(226,87,43,0.22)",
                color: "white"
              }}
            >
              Begin My Journey <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              href="mailto:concierge@tripcraft.ai"
              variant="outlineLight"
              size="lg"
              className="closing-cta-secondary w-full sm:w-auto"
              icon={MessageCircle}
            >
              Speak with Concierge
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
