// src/pages/Dashboard/DashboardPage.jsx
import ReadinessRing from "./ReadinessRing";
import BudgetCard from "./BudgetCard";
import WeatherCard from "./WeatherCard";
import PackingCard from "./PackingCard";
import RecommendationsCard from "./RecommendationsCard";
import dashboardMock from "../../data/dashboardMock";

/**
 * DashboardPage
 *
 * Route: "/dashboard" — the trip readiness overview: readiness ring banner,
 * budget + weather side by side, the full packing checklist, and curated
 * recommendations. All content is sourced from data/dashboardMock.js.
 */
const DashboardPage = () => {
  const { destination, daysUntilDeparture, readiness, budget, weather, packingChecklist, recommendations } =
    dashboardMock;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#E2572B]">
          {destination} · Departing in {daysUntilDeparture} days
        </p>
      </div>

      <ReadinessRing
        percent={readiness.percent}
        headline={readiness.headline}
        description={readiness.description}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <BudgetCard budget={budget} />
        <WeatherCard weather={weather} />
      </div>

      <div className="mt-6">
        <PackingCard packingChecklist={packingChecklist} />
      </div>

      <div className="mt-10">
        <RecommendationsCard recommendations={recommendations} />
      </div>
    </div>
  );
};

export default DashboardPage;