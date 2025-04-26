import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HistoryItem {
  id: number;
  title: string;
  poster_path: string | null;
  media_type: 'movie' | 'tv';
  year?: string;
}

interface SearchState {
  open: boolean;
  query: string;
  history: HistoryItem[];
  setOpen: (open: boolean) => void;
  setQuery: (query: string) => void;
  addToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      open: false,
      query: '',
      history: [],
      setOpen: (open) => set({ open }),
      setQuery: (query) => set({ query }),
      addToHistory: (item) => set((state) => ({
        history: [
          item,
          ...state.history.filter((h) => h.id !== item.id)
        ].slice(0, 10) // Mantener solo los últimos 10 items
      })),
      clearHistory: () => set({ history: [] })
    }),
    {
      name: 'search-storage',
    }
  )
);