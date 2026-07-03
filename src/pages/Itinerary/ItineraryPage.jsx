// src/pages/Itinerary/ItineraryPage.jsx
import { useState } from "react";
import { Share2, Download, MapPin } from "lucide-react";
import DayTimeline from "./DayTimeline";
import RouteMapPanel from "./RouteMapPanel";
import itineraryMock from "../../data/itineraryMock";

/**
 * ItineraryPage
 *
 * Route: "/itinerary" (and "/itinerary/:tripId" for a specific saved trip —
 * tripId isn't wired to multiple mock trips yet, so both currently render
 * the single itineraryMock.js trip). Day tabs switch which day's
 * DayTimeline is shown; RouteMapPanel stays pinned alongside it.
 */
const ItineraryPage = () => {
  const [selectedDay, setSelectedDay] = useState(itineraryMock.days[0].dayNumber);

  const activeDay = itineraryMock.days.find((d) => d.dayNumber === selectedDay);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#1F8A5F]/15 to-[#1F8A5F]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1F8A5F] border border-[#1F8A5F]/20">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1F8A5F] animate-soft-pulse" /> Active Journey
          </span>
          <h1 className="mt-3 text-3xl font-bold text-[#0F3D4D] sm:text-4xl">
            {itineraryMock.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-[#0F3D4D]/60">
            <MapPin className="h-3.5 w-3.5" /> {itineraryMock.destination}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#0F3D4D]/65">
            {itineraryMock.subtitle}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            aria-label="Share itinerary"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0F3D4D]/15 text-[#0F3D4D] transition-colors hover:bg-[#0F3D4D]/5"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            aria-label="Download itinerary"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0F3D4D]/15 text-[#0F3D4D] transition-colors hover:bg-[#0F3D4D]/5"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {itineraryMock.days.map((day) => (
          <button
            key={day.dayNumber}
            onClick={() => setSelectedDay(day.dayNumber)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              selectedDay === day.dayNumber
                ? "bg-gradient-to-r from-[#0F3D4D] to-[#16515f] text-[#FDF6EE] shadow-md shadow-[#0F3D4D]/20"
                : "bg-[#0F3D4D]/5 text-[#0F3D4D]/70 hover:bg-[#0F3D4D]/10"
            }`}
          >
            Day {day.dayNumber}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        <DayTimeline day={activeDay} />
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <RouteMapPanel
            insights={itineraryMock.destinationInsights}
            weather={itineraryMock.localWeather}
            routeMap={itineraryMock.routeMap}
            tip={itineraryMock.aiTip}
          />
        </aside>
      </div>
    </div>
  );
};

export default ItineraryPage;