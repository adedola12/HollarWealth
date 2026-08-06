import { motion as Motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";

// Fades each routed page in on navigation; static when the user
// prefers reduced motion. Keyed by pathname so every route change
// replays the entrance.
export default function PageTransition({ children }) {
  const reduceMotion = useReducedMotion();
  const { pathname } = useLocation();

  if (reduceMotion) {
    return children;
  }

  return (
    <Motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  );
}
