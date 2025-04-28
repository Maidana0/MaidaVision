import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface SearchState {
  isOpen: boolean;
  history: MultiSearchItem[];
  setIsOpen: (isOpen: boolean) => void;
  openDialog: () => void;
  closeDialog: () => void;
  addToHistory: (item: MultiSearchItem) => void;
  clearHistory: () => void;
}

const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      isOpen: false,
      history: [],
      setIsOpen: (isOpen) => set({ isOpen }),
      openDialog: () => set({ isOpen: true }),
      closeDialog: () => set({ isOpen: false }),
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