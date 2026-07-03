// src/pages/Vault/VaultPage.jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { Compass, Globe, Camera, BookOpen, ArrowLeft, Calendar, MapPin, Sparkles } from "lucide-react";
import vaultMock, { getJournalBySlug } from "../../data/vaultMock";

const STAT_ICON = {
  journeysCrafted: Compass,
  countriesVisited: Globe,
  photosCurated: Camera,
  memoriesWritten: BookOpen,
};

const STAT_LABEL = {
  journeysCrafted: "Journeys Crafted",
  countriesVisited: "Countries Visited",
  photosCurated: "Photos Curated",
  memoriesWritten: "Memories Written",
};

/**
 * VaultPage
 *
 * Route: "/vault" — grid of every trip journal in data/vaultMock.js.
 * Route: "/vault/:tripSlug" — a single journal's detail view.
 * Both are handled by this one component per the file architecture, keyed
 * off the optional `tripSlug` route param.
 */
const VaultPage = () => {
  const { tripSlug } = useParams();
  const navigate = useNavigate();

  if (tripSlug) {
    const journal = getJournalBySlug(tripSlug);
    return <JournalDetail journal={journal} onBack={() => navigate("/vault")} />;
  }

  return <JournalGrid />;
};

const JournalGrid = () => {
  const { heading, subheading, stats, journals } = vaultMock;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold text-[#0F3D4D] sm:text-4xl">{heading}</h1>
        <p className="mt-2 max-w-xl text-sm text-[#0F3D4D]/60 sm:text-base">{subheading}</p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(stats).map(([key, value]) => {
          const Icon = STAT_ICON[key];
          return (
            <div key={key} className="rounded-2xl bg-white p-5 text-center shadow-sm shadow-black/5">
              {Icon && <Icon className="mx-auto h-5 w-5 text-[#0F3D4D]/50" />}
              <p className="mt-2 text-2xl font-bold text-[#0F3D4D]">{value}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-[#0F3D4D]/50">
                {STAT_LABEL[key]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Journal cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {journals.map((journal) => (
          <Link
            key={journal.id}
            to={`/vault/${journal.tripSlug}`}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src={journal.coverImage}
                alt={journal.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {journal.status === "active" && (
                <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#1F8A5F] px-3 py-1 text-[11px] font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" /> Active
                </span>
              )}
              <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                {journal.highlightCount} highlights
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#E2572B]">
                {journal.mood}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold text-[#0F3D4D]">{journal.title}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-[#0F3D4D]/55">
                <MapPin className="h-3 w-3" /> {journal.destination}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#0F3D4D]/55">
                <Calendar className="h-3 w-3" /> {journal.dateRange}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#0F3D4D]/65">{journal.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const JournalDetail = ({ journal, onBack }) => {
  if (!journal) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="text-lg font-semibold text-[#0F3D4D]">Journal not found</p>
        <p className="mt-2 text-sm text-[#0F3D4D]/60">
          This journey doesn't exist in your vault yet.
        </p>
        <button
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#0F3D4D] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Vault
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium text-[#0F3D4D]/70 hover:text-[#0F3D4D]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Vault
      </button>

      <div className="relative mt-6 h-80 w-full overflow-hidden rounded-3xl">
        <img src={journal.coverImage} alt={journal.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8">
          {journal.status === "active" && (
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#1F8A5F] px-3 py-1 text-[11px] font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> Active Journey
            </span>
          )}
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{journal.title}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {journal.destination}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {journal.dateRange}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-[1fr_280px]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#E2572B]">
            {journal.mood}
          </p>
          <p className="mt-3 text-base leading-relaxed text-[#0F3D4D]/75">{journal.summary}</p>
        </div>

        {journal.pinnedMemory && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5">
            <img
              src={journal.pinnedMemory.image}
              alt="Pinned memory"
              className="h-40 w-full object-cover"
            />
            <div className="flex items-start gap-2 p-4">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E8A23D]" />
              <p className="text-xs italic leading-relaxed text-[#0F3D4D]/70">
                "{journal.pinnedMemory.caption}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultPage;