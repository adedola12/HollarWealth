import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Testimonials are admin-managed content. Until a backend source is wired,
// this starts empty and the section hides itself — no placeholder reviews.
const Testimony = () => {
  const [testimonials] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  // Hide entirely until there is real, admin-provided content.
  if (!testimonials.length) return null;

  const perView =
    window.innerWidth >= 1024 ? 5 : window.innerWidth >= 640 ? 5 : 2;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + perView);

  const handleNext = () => {
    if (startIndex + perView < testimonials.length)
      setStartIndex(startIndex + perView);
  };
  const handlePrev = () => {
    if (startIndex - perView >= 0) setStartIndex(startIndex - perView);
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 my-16">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            Testimonials
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            What our customers are saying
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-500"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth snap-x">
        <div className="flex gap-4 transition-all duration-300 ease-in-out">
          {visibleTestimonials.map((item, idx) => (
            <TestimonialCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimony;
