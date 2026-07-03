// src/pages/Landing/WhyTripCraft.jsx
import { Compass, SlidersHorizontal, Sparkles, Plane, Camera, CloudSun, Wallet, Headphones } from "lucide-react";
import Button from "../../components/Button";

const JOURNEY_STEPS = [
  { id: "discover", label: "Discover", icon: Compass, description: "Share your mood, desired climate and interests." },
  { id: "personalize", label: "Personalize", icon: SlidersHorizontal, description: "Fine-tune your pace from 'Deep Rest' to 'High Adventure'." },
  { id: "ai-crafts", label: "AI Crafts", icon: Sparkles, description: "Instant generation of a bespoke, multi-layered itinerary.", active: true },
  { id: "travel", label: "Travel", icon: Plane, description: "Seamless bookings and real-time smart concierge support." },
  { id: "memories", label: "Memories", icon: Camera, description: "Return with curated digital journals of your journey." },
];

const STATS = [
  { id: "satisfaction", value: "98%", label: "Satisfaction Rate" },
  { id: "destinations", value: "142+", label: "Exclusive Destinations" },
  { id: "journeys", value: "12k", label: "Journeys Crafted" },
  { id: "response", value: "35ms", label: "AI Response Time" },
];

/**
 * WhyTripCraft
 *
 * "Precision Engineering for Luxury" section — the 5-step journey rail
 * followed by the four signature feature tiles and closing stats bar.
 */
const WhyTripCraft = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E2572B]">
          The Art of Discovery
        </p>
        <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-bold text-[#0F3D4D] sm:text-4xl">
          A Journey Tailored to Your Soul
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#0F3D4D]/60 sm:text-base">
          Skip the logistics. Embrace the magic. Our AI understands your preferences before you even
          articulate them.
        </p>
      </div>

      {/* Journey steps */}
      <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-5">
        {JOURNEY_STEPS.map((step) => (
          <div key={step.id} className="flex flex-col items-center text-center">
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-full border ${
                step.active
                  ? "border-[#0F3D4D] bg-[#0F3D4D] text-[#FDF6EE]"
                  : "border-[#0F3D4D]/15 bg-white text-[#0F3D4D]"
              }`}
            >
              <step.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-sm font-semibold text-[#0F3D4D]">{step.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#0F3D4D]/55">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Feature grid */}
      <div className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E2572B]">
          Precision Engineering for Luxury
        </p>
        <p className="mt-1 text-sm text-[#0F3D4D]/60">
          Every feature is designed to reduce cognitive load, allowing you to simply be present in the
          moment.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2">
          {/* Hyper-personalized — wide left tile */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#F7ECDD] p-8 md:col-span-2 md:row-span-1">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#E2572B]">
                Proprietary AI Engine
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#0F3D4D]">Hyper-Personalized Itineraries</h3>
              <p className="mt-2 max-w-md text-sm text-[#0F3D4D]/65">
                Our neural network analyzes over 15,000 data points to craft a schedule that flows
                naturally, avoiding peak crowds and maximizing sunlight hours.
              </p>
            </div>
            <Button variant="primary" size="sm" className="mt-6 w-fit">
              Explore AI Tech
            </Button>
          </div>

          {/* Predictive weather — dark tile */}
          <div className="rounded-2xl bg-[#0F3D4D] p-8 text-[#FDF6EE]">
            <CloudSun className="h-6 w-6 text-[#E8A23D]" />
            <h3 className="mt-4 text-lg font-bold">Predictive Smart Weather</h3>
            <p className="mt-2 text-sm text-white/70">
              We don't just show the forecast — we adjust your lunch spot or coastal walk in real-time
              to guarantee the perfect lighting and temperature.
            </p>
          </div>

          {/* Invisible budgeting */}
          <div className="rounded-2xl bg-white p-8 shadow-sm shadow-black/5">
            <Wallet className="h-6 w-6 text-[#0F3D4D]" />
            <h3 className="mt-4 text-lg font-bold text-[#0F3D4D]">Invisible Budgeting</h3>
            <p className="mt-2 text-sm text-[#0F3D4D]/60">
              Sophisticated analysis that balances luxury with value, ensuring every dollar spent
              delivers maximum experiential ROI.
            </p>
            <button className="mt-3 text-sm font-medium text-[#0F3D4D] underline underline-offset-4">
              Learn more
            </button>
          </div>

          {/* Elite concierge — accent tile, wide */}
          <div className="flex items-center justify-between gap-6 rounded-2xl bg-[#E2572B] p-8 text-white md:col-span-2">
            <div>
              <h3 className="text-lg font-bold">Elite Concierge Access</h3>
              <p className="mt-2 max-w-md text-sm text-white/85">
                24/7 priority support that combines human empathy with AI speed. Reservations at
                "Fully Booked" locations are just a tap away.
              </p>
            </div>
            <Headphones className="h-10 w-10 shrink-0 text-white/70" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-8 border-t border-[#0F3D4D]/10 pt-10 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.id} className="text-center">
            <p className="text-3xl font-bold text-[#0F3D4D] sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-[#0F3D4D]/50">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyTripCraft;