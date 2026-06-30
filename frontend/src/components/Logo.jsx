// Brand wordmark for Horlawealth Gadgets.
// Renders visual only (no <Link>) so callers can wrap it as needed.
//   variant="color"  -> for light surfaces (auto-adapts in dark mode)
//   variant="light"  -> for dark/colored surfaces (footer, etc.)
//   compact          -> monogram only (collapsed sidebar)
export default function Logo({ variant = "color", compact = false, className = "" }) {
  const mark = (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-lg font-bold text-white shadow-sm">
      H
    </span>
  );

  if (compact) {
    return (
      <span className={className} aria-label="Horlawealth Gadgets">
        {mark}
      </span>
    );
  }

  const nameMain =
    variant === "light" ? "text-white" : "text-gray-900 dark:text-white";
  const accent =
    variant === "light" ? "text-blue-200" : "text-blue-600 dark:text-blue-400";
  const sub =
    variant === "light" ? "text-blue-200/80" : "text-blue-600 dark:text-blue-400";

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="Horlawealth Gadgets"
    >
      {mark}
      <span className="leading-none">
        <span className={`block text-lg font-bold tracking-tight ${nameMain}`}>
          Horla<span className={accent}>wealth</span>
        </span>
        <span
          className={`block text-[10px] font-semibold tracking-[0.25em] ${sub}`}
        >
          GADGETS
        </span>
      </span>
    </span>
  );
}
