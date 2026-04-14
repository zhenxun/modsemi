import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CurrentUser {
  name: string;
  avatar?: string;
  email?: string;
  roles: string[];
}

export interface AuthState {
  currentUser: CurrentUser | null;
  isLoggedIn: boolean;
}

export interface AuthActions {
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const MOCK_USERS = [
  {
    username: 'admin',
    password: 'admin.modsemi',
    user: {
      name: 'Admin',
      email: 'admin@modsemi.dev',
      roles: ['admin'] as string[],
      avatar: undefined as string | undefined,
    },
  },
];

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    set => ({
      currentUser: null,
      isLoggedIn: false,

      login: (username: string, password: string) => {
        const found = MOCK_USERS.find(
          u => u.username === username && u.password === password,
        );
        if (found) {
          set({ currentUser: found.user, isLoggedIn: true });
          return true;
        }
        return false;
      },

      logout: () => set({ currentUser: null, isLoggedIn: false }),
    }),
    {
      name: 'modsemi-auth',
      partialize: state => ({
        currentUser: state.currentUser,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
