// src/pages/Itinerary/RouteMapPanel.jsx
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { Car, Wallet, Sun, Droplets, Lightbulb, Navigation2, MapPin } from "lucide-react";

// OSRM's free public routing server — no API key required.
// Good for prototypes/demos; swap the base URL for a self-hosted or
// paid OSRM/Mapbox instance before relying on this in production.
const OSRM_BASE_URL = "https://router.project-osrm.org/route/v1/driving";

const PIN_COLORS = {
  morning: "#E8A23D",
  afternoon: "#E2572B",
  evening: "#0F3D4D",
};

// Numbered pin icon built with plain HTML/CSS (no external image assets,
// so nothing to configure with Vite's asset pipeline).
const buildPinIcon = (index, type) =>
  L.divIcon({
    className: "tripcraft-pin",
    html: `
      <div style="
        width:30px;height:30px;border-radius:9999px 9999px 9999px 0;
        transform: rotate(45deg);
        background:${PIN_COLORS[type] || "#0F3D4D"};
        border:2px solid #FDF6EE;
        box-shadow:0 2px 6px rgba(15,61,77,0.35);
        display:flex;align-items:center;justify-content:center;
      ">
        <span style="
          transform: rotate(-45deg);
          color:#FDF6EE;font-size:12px;font-weight:700;font-family:Inter,sans-serif;
        ">${index + 1}</span>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 28],
    popupAnchor: [0, -26],
  });

// Fits the map viewport to show every pin once, and again if the pin set changes.
const FitToPins = ({ pins }) => {
  const map = useMap();
  useEffect(() => {
    if (!pins || pins.length === 0) return;
    if (pins.length === 1) {
      map.setView([pins[0].lat, pins[0].lng], 15);
      return;
    }
    const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [36, 36] });
  }, [pins, map]);
  return null;
};

const RouteMapPanel = ({ insights, weather, routeMap, tip }) => {
  const [routeLine, setRouteLine] = useState(null); // real road geometry from OSRM
  const [routeSummary, setRouteSummary] = useState(null); // { distanceKm, durationMin }
  const [routeStatus, setRouteStatus] = useState("idle"); // idle | loading | ready | fallback

  const pins = routeMap?.pins || [];

  // Straight-line fallback, used instantly and kept if the routing request fails.
  const straightLine = useMemo(
    () => pins.map((p) => [p.lat, p.lng]),
    [pins]
  );

  useEffect(() => {
    if (pins.length < 2) return;
    let cancelled = false;
    setRouteStatus("loading");

    const coordStr = pins.map((p) => `${p.lng},${p.lat}`).join(";");
    const url = `${OSRM_BASE_URL}/${coordStr}?overview=full&geometries=geojson`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Routing request failed");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const route = data?.routes?.[0];
        if (!route) throw new Error("No route returned");
        const line = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRouteLine(line);
        setRouteSummary({
          distanceKm: (route.distance / 1000).toFixed(1),
          durationMin: Math.round(route.duration / 60),
        });
        setRouteStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setRouteLine(straightLine);
        setRouteStatus("fallback");
      });

    return () => {
      cancelled = true;
    };
  }, [pins, straightLine]);

  const center = routeMap?.center
    ? [routeMap.center.lat, routeMap.center.lng]
    : [20.5937, 78.9629]; // fallback: center of India

  return (
    <div className="space-y-5">
      {/* Destination insights */}
      {insights && (
        <div className="rounded-2xl bg-white p-5 shadow-sm shadow-black/5 transition-shadow hover:shadow-md">
          <h3 className="text-sm font-semibold text-[#0F3D4D]">Destination Insights</h3>
          <div className="mt-4 space-y-3">
            {insights.preferredProvider && (
              <div className="flex items-start gap-3">
                <Car className="mt-0.5 h-4 w-4 shrink-0 text-[#0F3D4D]/50" />
                <div>
                  <p className="text-xs text-[#0F3D4D]/50">{insights.preferredProvider.label}</p>
                  <p className="text-sm font-medium text-[#0F3D4D]">{insights.preferredProvider.value}</p>
                </div>
              </div>
            )}
            {insights.currencyGuidance && (
              <div className="flex items-start gap-3">
                <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-[#0F3D4D]/50" />
                <div>
                  <p className="text-xs text-[#0F3D4D]/50">{insights.currencyGuidance.label}</p>
                  <p className="text-sm font-medium text-[#0F3D4D]">{insights.currencyGuidance.value}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Local weather — gradient card */}
      {weather && (
        <div
          className="rounded-2xl p-5 text-[#FDF6EE] animate-gradient-shift"
          style={{
            background: "linear-gradient(135deg, #0F3D4D 0%, #16515f 50%, #0b2e3a 100%)",
            backgroundSize: "200% 200%",
          }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Local Weather</p>
            <Sun className="h-4 w-4 text-[#E8A23D] animate-soft-pulse" />
          </div>
          <p className="mt-2 text-4xl font-bold">{weather.temperature}°</p>
          <p className="mt-1 text-sm text-white/70">{weather.condition}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
              <p className="flex items-center gap-1.5 text-[11px] text-white/60">
                <Droplets className="h-3 w-3" /> Humidity
              </p>
              <p className="mt-1 text-sm font-semibold">{weather.humidity}%</p>
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
              <p className="text-[11px] text-white/60">UV Index</p>
              <p className="mt-1 text-sm font-semibold">{weather.uvLabel} ({weather.uvIndex})</p>
            </div>
          </div>
        </div>
      )}

      {/* Real, interactive route map */}
      {routeMap && pins.length > 0 && (
        <div className="relative w-full overflow-hidden rounded-2xl shadow-sm">
          <div className="h-72 w-full">
            <MapContainer
              center={center}
              zoom={routeMap.zoom || 14}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <FitToPins pins={pins} />

              {routeLine && (
                <Polyline
                  positions={routeLine}
                  pathOptions={{
                    color: "#E2572B",
                    weight: 4,
                    opacity: 0.85,
                    dashArray: routeStatus === "fallback" ? "8 8" : null,
                  }}
                />
              )}

              {pins.map((pin, i) => (
                <Marker key={pin.id} position={[pin.lat, pin.lng]} icon={buildPinIcon(i, pin.type)}>
                  <Popup>
                    <span className="text-xs font-semibold text-[#0F3D4D]">
                      {i + 1}. {pin.label}
                    </span>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Activities badge */}
          {routeMap.activitiesToday != null && (
            <span className="pointer-events-none absolute bottom-3 right-3 z-[500] rounded-full bg-[#0F3D4D] px-3 py-1.5 text-xs font-medium text-white shadow-md">
              {routeMap.activitiesToday} activities today
            </span>
          )}

          {/* Live route summary */}
          <span className="pointer-events-none absolute bottom-3 left-3 z-[500] flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-[#0F3D4D] shadow-md">
            <Navigation2 className="h-3 w-3 text-[#E2572B]" />
            {routeStatus === "loading" && "Fetching route…"}
            {routeStatus === "ready" && routeSummary && `${routeSummary.distanceKm} km • ${routeSummary.durationMin} min`}
            {routeStatus === "fallback" && "Straight-line estimate"}
          </span>
        </div>
      )}

      {/* Single-pin case (no route to draw) */}
      {routeMap && pins.length === 1 && (
        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs text-[#0F3D4D]/70 shadow-sm">
          <MapPin className="h-3.5 w-3.5 text-[#E2572B]" /> {pins[0].label}
        </div>
      )}

      {/* AI tip */}
      {tip && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-dashed border-[#E8A23D]/40 bg-[#E8A23D]/5 p-4 transition-all hover:border-[#E8A23D]/70 hover:bg-[#E8A23D]/8">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#E8A23D]" />
          <p className="text-xs italic leading-relaxed text-[#0F3D4D]/70">"{tip.quote}"</p>
        </div>
      )}
    </div>
  );
};

export default RouteMapPanel;