import { z } from "zod/v4";

// Auth user types
export interface AuthUser {
  email: string;
  isLoggedIn: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
}

export interface UseAuthReturn extends AuthState {
  login: (email: string) => void;
  logout: () => void;
}

// Login form schema and types
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Podaj poprawny adres email")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Podaj poprawny adres email"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
