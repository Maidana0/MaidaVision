import { create } from 'zustand';


interface QueryParamState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearQuery: () => void;
}


const useQueryParamStore = create<QueryParamState>()(
  (set) => ({
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),

    clearQuery: () => set({ searchQuery: '' })
  })
);

export default useQueryParamStore;