import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface SearchState {
  history: MultiSearchItem[];
  addToHistory: (item: MultiSearchItem) => void;
  clearHistory: () => void;
}

const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      history: [],
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

export default useSearchStore;