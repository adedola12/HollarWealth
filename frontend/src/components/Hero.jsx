import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import hero1 from "../assets/hero-1.jpg";
import hero2 from "../assets/hero-2.jpg";
import hero3 from "../assets/hero-3.jpg";

// Modern, techy hero slides. Imagery is bundled locally (offline-safe); a dark
// gradient overlay keeps copy readable even if an image is slow to load.
const SLIDES = [
  {
    eyebrow: "Welcome to Horlawealth Gadgets",
    title: (
      <>
        The latest tech, <span className="text-blue-400">delivered.</span>
      </>
    ),
    subtitle: "Premium laptops, phones & accessories — curated for you.",
    image: hero1,
  },
  {
    eyebrow: "Built for performance",
    title: (
      <>
        Power your <span className="text-blue-400">workflow.</span>
      </>
    ),
    subtitle: "Top brands. Honest prices. Nationwide delivery.",
    image: hero2,
  },
  {
    eyebrow: "New arrivals",
    title: (
      <>
        Upgrade your <span className="text-blue-400">setup.</span>
      </>
    ),
    subtitle: "Discover the newest gadgets, hand-picked by our team.",
    image: hero3,
  },
];

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 60;

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const textItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const count = SLIDES.length;
  const slide = SLIDES[index];

  const go = useCallback((i) => setIndex((i + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // auto-advance (pauses while the user hovers or touches the hero)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % count),
      AUTOPLAY_MS
    );
    return () => clearInterval(id);
  }, [count, paused]);

  // resume autoplay a moment after touch interaction ends
  const resumeTimer = useRef(null);
  const pauseTemporarily = () => {
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 8000);
  };
  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const onDragEnd = (_, info) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  };

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 pt-6">
      <div
        className="relative h-[380px] overflow-hidden rounded-3xl bg-slate-900 shadow-lg sm:h-[440px] lg:h-[500px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* slide image — crossfade with a slow, subtle zoom */}
        <AnimatePresence initial={false}>
          <Motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
            initial={{ opacity: 0 }}
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: [1, 1.06] }
            }
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: AUTOPLAY_MS / 1000 + 1, ease: "linear" },
            }}
          />
        </AnimatePresence>

        {/* readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/20" />

        {/* swipeable content layer */}
        <Motion.div
          className="relative h-full touch-pan-y"
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragStart={pauseTemporarily}
          onDragEnd={onDragEnd}
        >
          <AnimatePresence mode="wait" initial={false}>
            <Motion.div
              key={index}
              variants={reduceMotion ? undefined : textContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              className="flex h-full max-w-2xl flex-col justify-center px-6 text-white sm:px-12 lg:px-16"
            >
              <Motion.p
                variants={reduceMotion ? undefined : textItem}
                className="mb-4 w-fit rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide"
              >
                {slide.eyebrow}
              </Motion.p>
              <Motion.h1
                variants={reduceMotion ? undefined : textItem}
                className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
              >
                {slide.title}
              </Motion.h1>
              <Motion.p
                variants={reduceMotion ? undefined : textItem}
                className="mt-4 max-w-md text-sm text-gray-200 sm:text-base"
              >
                {slide.subtitle}
              </Motion.p>
              <Motion.div variants={reduceMotion ? undefined : textItem}>
                <Link
                  to="/collection"
                  className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  Shop now
                  <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Motion.div>
            </Motion.div>
          </AnimatePresence>
        </Motion.div>

        {/* arrows — desktop affordance; swiping covers mobile */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors duration-200 hover:bg-white/35 sm:grid"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors duration-200 hover:bg-white/35 sm:grid"
        >
          <FiChevronRight className="h-5 w-5" />
        </button>

        {/* dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                go(i);
                pauseTemporarily();
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                i === index
                  ? "w-7 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
