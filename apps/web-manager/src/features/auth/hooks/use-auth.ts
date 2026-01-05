import { useState, useEffect, useCallback } from "react";
import type { AuthUser, AuthState, UseAuthReturn } from "../types/auth.types";

const AUTH_STORAGE_KEY = "beaution_auth";

function getStoredAuth(): AuthUser | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
}

function setStoredAuth(user: AuthUser | null): void {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const storedUser = getStoredAuth();
    setState({
      user: storedUser,
      isLoading: false,
    });
  }, []);

  const login = useCallback((email: string) => {
    const user: AuthUser = {
      email,
      isLoggedIn: true,
    };
    setStoredAuth(user);
    setState({ user, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    setStoredAuth(null);
    setState({ user: null, isLoading: false });
  }, []);

  return {
    ...state,
    login,
    logout,
  };
}
