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
    <footer className="footer-glass footer-minimal px-6 py-10 sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          {/* Wordmark */}
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="footer-logo-mark flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-110 group-hover:rotate-3">
              <img src={LOGO_SRC} alt="TripCraft" className="h-full w-full object-contain" />
            </span>
            <span className="text-base font-bold tracking-tight text-white">TripCraft</span>
          </Link>

          {/* Links */}
          <nav aria-label="Footer navigation" className="footer-nav flex flex-wrap items-center gap-1">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link px-3 py-2 text-sm text-white/55 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
            <div className="footer-socials flex items-center gap-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TripCraft on Instagram"
              className="social-icon flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/65"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TripCraft on Twitter"
              className="social-icon flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/65"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="footer-bottom flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {year} TripCraft AI. Sophisticated exploration, curated by intelligence.</p>
          <p className="font-medium tracking-[0.12em] text-white/35">CRAFTING BEYOND THE ORDINARY SINCE 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
