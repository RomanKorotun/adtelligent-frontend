import { create } from "zustand";

interface AuthState {
  userName: string | null;
  isLoggedIn: boolean;
  login: (name: string) => void;
  logout: () => void;
  current: (name: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userName: null,
  isLoggedIn: false,

  login: (name) =>
    set({
      userName: name,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      userName: null,
      isLoggedIn: false,
    }),

  current: (name) =>
    set({
      userName: name,
      isLoggedIn: true,
    }),
}));
