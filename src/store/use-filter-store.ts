import { create } from "zustand"
import { persist } from "zustand/middleware"
import { SortBy } from "maidana07/types/TMDB/tmdb-fetcher"

interface FilterState {
  genres: string[]
  years: { minYear: number; maxYear: number }
  sortBy: SortBy
  language: string
  originCountry: string
  watchProviders: string[]
  watchRegion: string
}

interface FilterActions {
  setGenres: (genres: string[]) => void
  toggleGenre: (genreId: string) => void
  setYears: (years: { minYear: number; maxYear: number }) => void
  setSortBy: (sortBy: SortBy) => void
  setLanguage: (language: string) => void
  setOriginCountry: (country: string) => void
  setWatchProviders: (providers: string[]) => void
  toggleWatchProvider: (providerId: string) => void
  setWatchRegion: (region: string) => void
  clearFilters: () => void
  resetFilters: () => void
}

type FilterStore = FilterState & FilterActions

const initialState: FilterState = {
  genres: [],
  years: { minYear: 1900, maxYear: new Date().getFullYear() },
  sortBy: SortBy.POPULARITY_DESC,
  language: 'all',
  originCountry: 'all',
  watchProviders: [],
  watchRegion: 'AR'
}

const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      ...initialState,

      setGenres: (genres) => set({ genres }),

      toggleGenre: (genreId) => set((state) => ({
        genres: state.genres.includes(genreId)
          ? state.genres.filter(id => id !== genreId)
          : [...state.genres, genreId]
      })),

      setYears: (years) => set({ years }),

      setSortBy: (sortBy) => set({ sortBy }),

      setLanguage: (language) => set({ language }),

      setOriginCountry: (originCountry) => set({ originCountry }),

      setWatchProviders: (watchProviders) => set({ watchProviders }),

      toggleWatchProvider: (providerId) => set((state) => ({
        watchProviders: state.watchProviders.includes(providerId)
          ? state.watchProviders.filter(id => id !== providerId)
          : [...state.watchProviders, providerId]
      })),

      setWatchRegion: (watchRegion) => set({ watchRegion }),

      clearFilters: () => set({
        genres: [],
        years: { minYear: 1900, maxYear: new Date().getFullYear() },
        language: 'all',
        originCountry: 'all',
        watchProviders: []
      }),

      resetFilters: () => set(initialState)
    }),
    {
      name: 'maidavision-filters',
      partialize: (state) => ({
        genres: state.genres,
        years: state.years,
        sortBy: state.sortBy,
        language: state.language,
        originCountry: state.originCountry,
        watchProviders: state.watchProviders,
        watchRegion: state.watchRegion
      })
    }
  )
)

export default useFilterStore 