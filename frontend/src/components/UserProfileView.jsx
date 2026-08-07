import { Link } from "react-router-dom";
import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  FiUser,
  FiPackage,
  FiHeart,
  FiShoppingCart,
  FiGrid,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

const ITEMS = [
  { to: "/profile", icon: FiUser, label: "Personal Information" },
  { to: "/orders", icon: FiPackage, label: "My Orders" },
  { to: "/wishlist", icon: FiHeart, label: "Wishlist" },
  { to: "/cart", icon: FiShoppingCart, label: "My Cart" },
];

export default function UserProfileView({ user, onLogout, onClose }) {
  const reduceMotion = useReducedMotion();
  const avatar =
    user?.profileImage || "https://api.dicebear.com/7.x/personas/svg";
  const isAdmin = user?.userType === "Admin";

  const items = isAdmin
    ? [...ITEMS, { to: "/inventory", icon: FiGrid, label: "Inventory" }]
    : ITEMS;

  return (
    <Motion.div
      className="w-72 origin-top-right overflow-hidden rounded-xl bg-white dark:bg-slate-900 text-sm shadow-xl shadow-blue-600/10 ring-1 ring-gray-200 dark:ring-slate-700"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: -4 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* header */}
      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 bg-gradient-to-r from-blue-600/10 via-transparent to-transparent p-4">
        <img
          src={avatar}
          alt=""
          className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-600/60 ring-offset-2 ring-offset-white dark:ring-offset-slate-900"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold text-gray-900 dark:text-gray-100">
              {user?.firstName} {user?.lastName}
            </p>
            {isAdmin && (
              <span className="rounded-full bg-blue-600/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                Admin
              </span>
            )}
          </div>
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>
        </div>
      </div>

      {/* menu */}
      <nav className="p-1.5">
        {items.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            onClick={onClose}
            to={to}
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 dark:text-gray-200 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-300"
          >
            <Icon className="text-base text-gray-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            <span className="flex-1">{label}</span>
            <FiChevronRight className="text-xs text-gray-300 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </nav>

      {/* logout */}
      <div className="border-t border-gray-100 dark:border-slate-800 p-1.5">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          <FiLogOut className="text-base" />
          Log out
        </button>
      </div>
    </Motion.div>
  );
}
