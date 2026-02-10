import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const AUTH_KEYS = ["user", "student", "role", "token"];

function readStoredUser() {
  try {
    const saved = sessionStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());
  const [authLoading, setAuthLoading] = useState(true);

  // Mark auth restore as complete after first mount.
  useEffect(() => {
    setAuthLoading(false);
  }, []);

  // Keep only auth-related keys in sync without wiping unrelated app caches.
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      if (user.student) {
        sessionStorage.setItem("student", JSON.stringify(user.student));
      } else {
        sessionStorage.removeItem("student");
      }
      if (user.role) {
        sessionStorage.setItem("role", JSON.stringify(user.role));
      } else {
        sessionStorage.removeItem("role");
      }
    } else {
      AUTH_KEYS.forEach((key) => sessionStorage.removeItem(key));
    }
  }, [user]);

  //Helper login & logout functions
  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
    sessionStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
