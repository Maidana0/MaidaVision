import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// interface SearchState {
//   isOpen: boolean;
//   history: string[];
//   open: () => void;
//   close: () => void;
//   addToHistory: (query: string) => void;
// }

// export const useSearchStore = create<SearchState>()(
//   persist(
//     (set, get) => ({
//       isOpen: false,
//       history: [],
//       open: () => set({ isOpen: true }),
//       close: () => set({ isOpen: false }),
//       addToHistory: (query) => {
//         if (!get().history.includes(query)) {
//           set({ history: [query, ...get().history].slice(0, 10) });
//         }
//       },
//     }),
//     { name: 'search-history' }
//   )
// );


interface SearchStore {
  open: boolean;
  query: string;
  history: string[];
  setOpen: (value: boolean) => void;
  setQuery: (query: string) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      open: false,
      query: '',
      history: [],
      setOpen: (value) => set({ open: value }),
      setQuery: (query) => set({ query }),
      addToHistory: (query) =>
        set((state) => ({
          history: [query, ...state.history.filter((item) => item !== query)].slice(0, 10),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'search-storage',
    }
  )
);
