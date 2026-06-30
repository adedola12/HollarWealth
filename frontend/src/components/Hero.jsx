import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Modern, techy hero slides. Imagery is decorative (Unsplash); a dark gradient
// overlay keeps copy readable even if an image is slow or blocked.
const SLIDES = [
  {
    eyebrow: "Welcome to Horlawealth Gadgets",
    title: (
      <>
        The latest tech, <span className="text-blue-400">delivered.</span>
      </>
    ),
    subtitle: "Premium laptops, phones & accessories — curated for you.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "Built for performance",
    title: (
      <>
        Power your <span className="text-blue-400">workflow.</span>
      </>
    ),
    subtitle: "Top brands. Honest prices. Nationwide delivery.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "New arrivals",
    title: (
      <>
        Upgrade your <span className="text-blue-400">setup.</span>
      </>
    ),
    subtitle: "Discover the newest gadgets, hand-picked by our team.",
    image:
      "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?auto=format&fit=crop&w=1600&q=80",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const count = SLIDES.length;

  const go = useCallback((i) => setIndex((i + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // auto-advance
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 pt-6">
      <div className="relative h-[380px] overflow-hidden rounded-3xl shadow-lg sm:h-[440px] lg:h-[500px]">
        {/* slides */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-slate-900 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* readability overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/20" />

            <div className="relative flex h-full max-w-2xl flex-col justify-center px-6 text-white sm:px-12 lg:px-16">
              <p className="mb-4 w-fit rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                {slide.eyebrow}
              </p>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-md text-sm text-gray-200 sm:text-base">
                {slide.subtitle}
              </p>
              <Link
                to="/collection"
                className="mt-6 inline-block w-fit rounded-full bg-blue-600 px-7 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
              >
                Shop now
              </Link>
            </div>
          </div>
        ))}

        {/* arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35"
        >
          <FiChevronRight className="h-5 w-5" />
        </button>

        {/* dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
