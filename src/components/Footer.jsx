// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Globe, Mail } from "lucide-react";

const FOOTER_LINKS = [
  { label: "AI Planner", to: "/planner" },
  { label: "Itinerary", to: "/itinerary" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Vault", to: "/vault" },
];

// Logo lives in /public — update this path if you saved it under a
// different filename (e.g. "/logo.png").
const LOGO_SRC = "/logo.jpg";

/**
 * Footer
 *
 * Glassmorphic footer matching the navbar treatment: frosted translucent
 * background, a slow drifting gradient glow, and links/social icons that
 * pick up the same pill + sliding-underline hover animation.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-glass relative overflow-hidden px-6 py-12">
      {/* Drifting gradient glow */}
      <div className="footer-gradient-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Wordmark */}
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-110 group-hover:rotate-3">
              <img src={LOGO_SRC} alt="TripCraft" className="h-full w-full object-contain" />
            </span>
            <span className="text-base font-bold tracking-tight text-[#0F3D4D]">TripCraft</span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-1">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link px-4 py-2 text-sm text-[#0F3D4D]/65 transition-colors duration-300 hover:text-[#0F3D4D]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TripCraft on Instagram"
              className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-[#0F3D4D]/15 text-[#0F3D4D]/60"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TripCraft on Twitter"
              className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-[#0F3D4D]/15 text-[#0F3D4D]/60"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="flex flex-col gap-2 border-t border-[#0F3D4D]/10 pt-6 text-xs text-[#0F3D4D]/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} TripCraft AI. Sophisticated exploration, curated by intelligence.</p>
          <p className="tracking-wide">CRAFTING BEYOND THE ORDINARY SINCE 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;