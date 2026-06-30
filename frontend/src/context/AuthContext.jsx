// ---------------------------------------------
//  frontend/src/context/AuthContext.jsx
// ---------------------------------------------
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("horlawealth:token") || null
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  /* fetch profile whenever token appears */
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    (async () => {
      try {
        setUser((await api.get("/api/users/profile")).data);
      } catch {
        localStorage.removeItem("horlawealth:token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  /* cross-tab sync */
  useEffect(() => {
    const sync = () => setToken(localStorage.getItem("horlawealth:token"));
    window.addEventListener("storage", sync);
    window.addEventListener("horlawealth-logout", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("horlawealth-logout", sync);
    };
  }, []);

  const login = (token, usr) => {
    localStorage.setItem("horlawealth:token", token);
    setToken(token);
    setUser(usr);
    window.dispatchEvent(new Event("horlawealth-login"));
  };

  const logout = async () => {
    await api.post("/api/users/logout").catch(() => {});
    localStorage.removeItem("horlawealth:token");
    setToken(null);
    setUser(null);
    window.dispatchEvent(new Event("horlawealth-logout"));
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
