// src/pages/Landing/LandingPage.jsx
import Hero from "./Hero";
import FeaturedDestinations from "./FeaturedDestinations";
import TrendingExperiences from "./TrendingExperiences";
import WhyTripCraft from "./WhyTripCraft";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";

/**
 * LandingPage
 *
 * Route: "/" — assembles the full marketing page. Navbar/Footer are
 * provided by the ChromeLayout wrapper in router/AppRouter.jsx, so this
 * component only owns the sections between them.
 */
const LandingPage = () => {
  return (
    <div>
      <Hero />
      <FeaturedDestinations />
      <TrendingExperiences />
      <WhyTripCraft />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default LandingPage;