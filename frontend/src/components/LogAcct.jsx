// ---------------------------------------------
//  frontend/src/pages/LogAcct.jsx
// ---------------------------------------------
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { motion as Motion, useReducedMotion } from "framer-motion";
import api from "../api";
import { useAuth } from "../context/AuthContext";

import "react-toastify/dist/ReactToastify.css";

export default function LogAcct() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.identifier || !formData.password) {
      toast.error("Please enter your login details.", {
        position: "top-center",
      });
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post("/api/users/login", {
        identifier: formData.identifier,
        password: formData.password,
      });

      login(
        data.token, // JWT
        {
          // user object for context
          ...data.user, // id, name, email, …
          permissions: data.permissions ?? [], // ⬅️  IMPORTANT
        }
      );
      toast.success("Login successful!", { position: "top-center" });
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] dark:bg-slate-950 px-4 py-10">
      <Motion.div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg shadow-blue-600/5 ring-1 ring-gray-100 dark:ring-slate-800 sm:p-10"
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="mb-1 text-xl font-semibold text-gray-800 dark:text-gray-100 sm:text-2xl">
          Log In
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          If you do not have an account with us, please create one on the
          register page.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="form-label">Phone Number or Email</label>
            <input
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="input"
              placeholder="you@example.com"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Signing in…" : "Log in"}
          </button>

          <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
            <span className="px-2">or</span>
          </div>

          <button type="button" className="btn-outline w-full" disabled>
            <FcGoogle className="text-lg" /> Log in with Google
          </button>
        </form>

        <div className="mt-4">
          <Link to={"/forgot-password"} className="link-brand text-sm">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-3 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
          <span className="px-2">
            Dont have an account?{" "}
            <Link to={"/signup"} className="link-brand">
              Sign Up Now!!!
            </Link>
          </span>
        </div>
      </Motion.div>
    </div>
  );
}
