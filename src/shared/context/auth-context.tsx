import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import * as Sentry from "@sentry/react";
import { setToken, clearToken, getToken } from "../lib/token-store";
import { setAuthToken, clearAuthToken } from "../lib/api-client";

export interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  persistAuth: (token: string, user: AuthUser) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(() => getToken());

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    setAuthToken(token);
    import("../../modules/auth/services/me.service")
      .then(({ getMe }) => getMe())
      .then((authUser) => setUser(authUser))
      .catch(() => {
        clearToken();
        clearAuthToken();
        setUser(null);
        setTokenState(null);
      });
  }, []); // runs once on mount

  function persistAuth(tokenValue: string, authUser: AuthUser) {
    setToken(tokenValue);
    setAuthToken(tokenValue);
    setUser(authUser);
    setTokenState(tokenValue);
    Sentry.setUser({ id: authUser.id, email: authUser.email });
  }

  function clearAuth() {
    clearToken();
    clearAuthToken();
    setUser(null);
    setTokenState(null);
    Sentry.setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, persistAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
