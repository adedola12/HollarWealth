import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  FiHome,
  FiGrid,
  FiShoppingCart,
  FiHeart,
  FiUser,
} from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

// Floating pill bottom navigation — primary nav on phones/tablets (hidden on lg+).
// Tap-first: labels are always visible under icons (no hover tooltips), targets ≥44px.
export default function BottomMenu() {
  const { pathname } = useLocation();
  const { cartItems, wishlistCount } = useContext(ShopContext);
  const { user } = useAuth();
  const reduceMotion = useReducedMotion();

  const cartCount = cartItems.reduce((t, i) => t + i.quantity, 0);

  const items = [
    { to: "/", label: "Home", icon: FiHome, exact: true },
    { to: "/collection", label: "Shop", icon: FiGrid },
    { to: "/cart", label: "Cart", icon: FiShoppingCart, badge: cartCount },
    { to: "/wishlist", label: "Saved", icon: FiHeart, badge: wishlistCount },
    { to: user ? "/profile" : "/login", label: "Account", icon: FiUser },
  ];

  const isActive = (item) =>
    item.exact ? pathname === item.to : pathname.startsWith(item.to);

  return (
    <Motion.nav
      initial={reduceMotion ? false : { y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="flex items-center gap-1 rounded-full border border-gray-200/80 bg-white/90 px-2 py-1.5 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.25)] backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/90">
        {items.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              aria-label={item.label}
              className="relative flex min-w-[56px] cursor-pointer flex-col items-center justify-center rounded-full px-2 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {active && (
                <Motion.span
                  layoutId="bottom-menu-active"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 30 }
                  }
                  className="absolute inset-0 rounded-full bg-blue-600/10 dark:bg-blue-400/15"
                />
              )}
              <Motion.span
                whileTap={reduceMotion ? undefined : { scale: 0.85 }}
                className="relative"
              >
                <Icon
                  className={`h-5 w-5 transition-colors duration-200 ${
                    active
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                />
                {item.badge > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid h-4 min-w-[16px] place-items-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </Motion.span>
              <span
                className={`relative mt-0.5 text-[10px] font-medium transition-colors duration-200 ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </Motion.nav>
  );
}
