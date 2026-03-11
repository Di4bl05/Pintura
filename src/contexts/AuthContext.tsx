"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  user: { email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciales válidas (en producción esto debería estar en backend)
const VALID_EMAIL = "admin";
const VALID_PASSWORD = "12345678";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const router = useRouter();

  // Verificar autenticación al cargar
  useEffect(() => {
    const authData = localStorage.getItem("admin_auth");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed.email === VALID_EMAIL) {
          setIsAuthenticated(true);
          setUser({ email: parsed.email });
        }
      } catch (e) {
        localStorage.removeItem("admin_auth");
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      setUser({ email });
      localStorage.setItem("admin_auth", JSON.stringify({ email }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("admin_auth");
    router.push("/admin");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
