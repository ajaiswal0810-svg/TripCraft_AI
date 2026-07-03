// src/pages/Landing/Testimonials.jsx
import { Quote, Star } from "lucide-react";
import { getFeaturedTestimonials } from "../../data/testimonials";

/**
 * Testimonials
 *
 * "Voices of the Modern Explorer" — quote cards pulled from
 * data/testimonials.js (featured entries only).
 */
const Testimonials = () => {
  const testimonials = getFeaturedTestimonials();

  return (
    <section className="bg-[#0F3D4D] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8A23D]">
            Trusted by Explorers
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#FDF6EE] sm:text-4xl">
            Voices of the Modern Explorer
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col justify-between rounded-2xl bg-white/5 p-7 backdrop-blur-sm"
            >
              <div>
                <Quote className="h-6 w-6 text-[#E8A23D]" aria-hidden="true" />
                <blockquote className="mt-4 text-sm leading-relaxed text-white/85">
                  "{t.quote}"
                </blockquote>
              </div>

              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs uppercase tracking-wide text-white/50">{t.title}</p>
                </div>
                <span className="ml-auto flex items-center gap-1 text-xs font-medium text-[#E8A23D]">
                  <Star className="h-3 w-3 fill-[#E8A23D]" /> {t.rating}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;