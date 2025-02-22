import { create } from 'zustand';

interface AppState {
  currentPage: string;
  theme: 'light' | 'dark' | 'system';
  setCurrentPage: (page: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'dashboard',
  theme: 'light',
  setCurrentPage: (page) => set({ currentPage: page }),
  setTheme: (theme) => set({ theme })
}));