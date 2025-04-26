import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchState {
  isOpen: boolean;
  history: string[];
  open: () => void;
  close: () => void;
  addToHistory: (query: string) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      history: [],
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addToHistory: (query) => {
        if (!get().history.includes(query)) {
          set({ history: [query, ...get().history].slice(0, 10) });
        }
      },
    }),
    { name: 'search-history' }
  )
);
