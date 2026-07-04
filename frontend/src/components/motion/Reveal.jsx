import { motion as Motion, useReducedMotion } from "framer-motion";

// Fade-up scroll reveal. Animates once when the element enters the viewport;
// renders statically when the user prefers reduced motion.
export default function Reveal({ children, delay = 0, y = 28, className }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Motion.div>
  );
}
