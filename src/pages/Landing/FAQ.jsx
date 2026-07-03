// src/pages/Landing/FAQ.jsx
import { useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";
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

/**
 * FAQ
 *
 * "Inquiries" accordion followed by the closing dark CTA band —
 * "Your next story is waiting."
 */
const FAQ = () => {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id);

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-[#0F3D4D] sm:text-4xl">Inquiries</h2>

        <div className="mt-10 divide-y divide-[#0F3D4D]/10 border-y border-[#0F3D4D]/10">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-[#0F3D4D]">{item.question}</span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 shrink-0 text-[#0F3D4D]/60" />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-[#0F3D4D]/60" />
                  )}
                </button>
                {isOpen && (
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-[#0F3D4D]/65">{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="bg-[#0B2E3A] px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-[#FDF6EE] sm:text-4xl">Your next story is waiting.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/70 sm:text-base">
          Experience travel that transcends the map. Join the elite group of explorers who have traded
          stress for serendipity.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button to="/planner" variant="accent" size="lg">
            Begin My Journey
          </Button>
          <Button href="mailto:concierge@tripcraft.ai" variant="outlineLight" size="lg" icon={MessageCircle}>
            Speak with Concierge
          </Button>
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-widest text-white/40">
          Crafting beyond the ordinary since 2024
        </p>
      </section>
    </>
  );
};

export default FAQ;