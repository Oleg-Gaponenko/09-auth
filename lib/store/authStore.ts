import { User } from "@/types/user";
import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface State {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    clearIsAuthenticated: () => void;
}

export const useAuthenticationStore = create<State>() ( persist ((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user: User) => 
      set ({ user, isAuthenticated: true }),
    clearIsAuthenticated: () =>
        set ({
            user: null,
            isAuthenticated: false,
        }), }),
    {
      name: 'authentication-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
)
);