import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface QueryParamState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearQuery: () => void;
}


const useQueryParamStore = create<QueryParamState>()(persist((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  clearQuery: () => set({ searchQuery: '' })
}), {
  name: 'query-storage',
}));

export default useQueryParamStore;