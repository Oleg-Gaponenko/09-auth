import { User } from "@/types/user";
import { create } from 'zustand';

interface State {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    clearIsAuthenticated: () => void;
}

export const useAuthenticationStore = create<State> ((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => 
      set ({
        user,
        isAuthenticated: true,
    }),
    clearIsAuthenticated: () =>
        set ({
            user: null,
            isAuthenticated: false,
        })
}))