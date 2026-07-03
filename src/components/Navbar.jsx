// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "./Button";

const NAV_LINKS = [
  { label: "AI Planner", to: "/planner" },
  { label: "Itinerary", to: "/itinerary" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Vault", to: "/vault" },
];

// Logo lives in /public — update this path if you saved it under a
// different filename (e.g. "/logo.png").
const LOGO_SRC = "logo.jpg";

/**
 * Navbar
 *
 * Sticky, glassmorphic header: translucent frosted background, a slow
 * drifting gradient glow, and nav links with a combined orange-pill +
 * sliding-underline hover animation. Reacts to scroll so a `transparent`
 * hero navbar solidifies once the page scrolls past the fold.
 *
 * Props:
 *  - transparent: renders on a transparent/dark hero (e.g. Landing hero
 *    video) with light text until scrolled.
 */
const Navbar = ({ transparent = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = transparent && !scrolled;

  const linkClass = ({ isActive }) =>
    `nav-link px-3 py-2 text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "active text-[#0F3D4D]"
        : "text-[#0F3D4D] hover:text-[#0F3D4D]"
    }`;

  return (
    <header
      className={`navbar-glass relative sticky top-0 z-50 w-full transition-all duration-500 ${
        isLight ? "navbar-glass-dark" : "navbar-glass-light"
      } ${scrolled ? "shadow-[0_8px_32px_rgba(15,61,77,0.12)]" : ""}`}
    >
      {/* Drifting gradient glow */}
      <div className="navbar-gradient-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <NavLink to="/" className="group flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-110 group-hover:rotate-3">
            <img src={LOGO_SRC} alt="TripCraft" className="h-full w-full object-contain" />
          </span>
          <span
            className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
              isLight ? "text-[#FDF6EE]" : "text-[#0F3D4D]"
            }`}
          >
            TripCraft
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button to="/planner" variant={isLight ? "gold" : "primary"} size="sm">
            Craft My Journey
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors duration-300 ${isLight ? "text-[#FDF6EE]" : "text-[#0F3D4D]"}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu — animated height/opacity instead of hard show/hide */}
      <div
        className={`grid overflow-hidden transition-all duration-400 ease-[var(--ease-out-soft)] md:hidden ${
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <nav className="navbar-glass-light flex flex-col gap-1 border-t border-white/20 px-6 py-4">
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={{ animationDelay: `${i * 60}ms` }}
                className={({ isActive }) =>
                  `nav-link animate-fade-in-up rounded-lg px-3 py-2 text-base font-medium ${
                    isActive ? "active text-[#0F3D4D]" : "text-[#0F3D4D]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/planner" variant="primary" size="sm" className="mt-2 w-full">
              Craft My Journey
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;