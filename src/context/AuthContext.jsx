// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "tripcraft:user";

/**
 * AuthProvider
 *
 * Lightweight client-side auth — no backend wired up yet. Persists the
 * "logged in" user to localStorage so refreshes don't log people out.
 *
 * Swap the bodies of login/signup for real API calls when the backend is
 * ready — everything else in the app only depends on this context's shape
 * ({ user, login, signup, logout, isAuthenticated }), so nothing else
 * needs to change.
 */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async ({ email, password }) => {
    // TODO: replace with a real API call
    if (!email || !password) throw new Error("Email and password are required.");
    const nextUser = { name: email.split("@")[0], email };
    setUser(nextUser);
    return nextUser;
  };

  const signup = async ({ name, email, password }) => {
    // TODO: replace with a real API call
    if (!name || !email || !password) throw new Error("All fields are required.");
    const nextUser = { name, email };
    setUser(nextUser);
    return nextUser;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export default AuthProvider;