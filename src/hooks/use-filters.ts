import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useFilterStore from 'maidana07/store/use-filter-store'
import { GetDiscoverProps, SortBy } from 'maidana07/types/TMDB/tmdb-fetcher'

/**
 * Hook principal que expone todo el estado y acciones de filtros
 */
export const useFilters = () => {
  return useFilterStore(
    useShallow((state) => ({
      // State
      genres: state.genres,
      years: state.years,
      sortBy: state.sortBy,
      language: state.language,
      originCountry: state.originCountry,
      watchProviders: state.watchProviders,
      watchRegion: state.watchRegion,

      // Actions
      setGenres: state.setGenres,
      toggleGenre: state.toggleGenre,
      setYears: state.setYears,
      setSortBy: state.setSortBy,
      setLanguage: state.setLanguage,
      setOriginCountry: state.setOriginCountry,
      setWatchProviders: state.setWatchProviders,
      toggleWatchProvider: state.toggleWatchProvider,
      setWatchRegion: state.setWatchRegion,
      clearFilters: state.clearFilters,
      resetFilters: state.resetFilters
    }))
  )
}

/**
 * Hook optimizado para componentes que solo necesitan acciones específicas
 */
export const useFilterActions = () => {
  return useFilterStore(
    useShallow((state) => ({
      setSortBy: state.setSortBy,
      toggleGenre: state.toggleGenre,
      setYears: state.setYears,
      clearFilters: state.clearFilters,
      resetFilters: state.resetFilters
    }))
  )
}

/**
 * Hook para estado computado y validaciones
 */
export const useFilterStatus = () => {
  const { genres, years, sortBy, language, originCountry, watchProviders } = useFilterStore(
    useShallow((state) => ({
      genres: state.genres,
      years: state.years,
      sortBy: state.sortBy,
      language: state.language,
      originCountry: state.originCountry,
      watchProviders: state.watchProviders
    }))
  )

  return useMemo(() => {
    const currentYear = new Date().getFullYear()

    const hasActiveFilters = (
      genres.length > 0 ||
      years.minYear !== 1900 ||
      years.maxYear !== currentYear ||
      language !== '' ||
      originCountry !== '' ||
      watchProviders.length > 0 ||
      sortBy !== SortBy.POPULARITY_DESC
    )

    let activeFilterCount = 0
    if (genres.length > 0) activeFilterCount++
    if (years.minYear !== 1900 || years.maxYear !== currentYear) activeFilterCount++
    if (language) activeFilterCount++
    if (originCountry) activeFilterCount++
    if (watchProviders.length > 0) activeFilterCount++
    if (sortBy !== SortBy.POPULARITY_DESC) activeFilterCount++

    return {
      hasActiveFilters,
      activeFilterCount,
      isDefaultSort: sortBy === SortBy.POPULARITY_DESC,
      hasGenreFilters: genres.length > 0,
      hasYearFilters: years.minYear !== 1900 || years.maxYear !== currentYear,
      hasWatchProviders: watchProviders.length > 0
    }
  }, [genres, years, sortBy, language, originCountry, watchProviders])
}

/**
 * Hook específico para llamadas a la API de TMDB
 */

export const useApiFilters = (): GetDiscoverProps | null => {
  const filterState = useFilterStore(
    useShallow((state) => ({
      genres: state.genres,
      years: state.years,
      sortBy: state.sortBy,
      language: state.language,
      originCountry: state.originCountry,
      watchProviders: state.watchProviders,
      watchRegion: state.watchRegion
    }))
  )

  return useMemo(() => {
    const currentYear = new Date().getFullYear()

    // Check if any filters are active
    const hasFilters = (
      filterState.genres.length > 0 ||
      filterState.years.minYear !== 1900 ||
      filterState.years.maxYear !== currentYear ||
      (filterState.language !== 'all' && filterState.language !== '') ||
      (filterState.originCountry !== 'all' && filterState.originCountry !== '') ||
      filterState.watchProviders.length > 0 ||
      filterState.sortBy !== SortBy.POPULARITY_DESC
    )

    if (!hasFilters) return null

    const filters: GetDiscoverProps = {
      sortBy: filterState.sortBy
    }

    // Add filters conditionally
    if (filterState.genres.length > 0) {
      filters.withGenres = filterState.genres
    }

    if (filterState.years.minYear !== 1900 || filterState.years.maxYear !== currentYear) {
      filters.years = filterState.years
    }

    if (filterState.language && filterState.language !== 'all') {
      filters.withOriginalLanguage = filterState.language
    }

    if (filterState.originCountry && filterState.originCountry !== 'all') {
      filters.withOriginCountry = filterState.originCountry
    }

    if (filterState.watchProviders.length > 0) {
      filters.withWatchProviders = filterState.watchProviders
      filters.watchRegion = filterState.watchRegion
    }

    return filters
  }, [filterState])
}

/**
 * Hook para componentes de ordenamiento
 */
export const useSortBy = () => {
  return useFilterStore(
    useShallow((state) => ({
      sortBy: state.sortBy,
      setSortBy: state.setSortBy
    }))
  )
}

export const useYearFilters = () => {
  return useFilterStore(
    useShallow((state) => ({
      years: state.years,
      setYears: state.setYears
    }))
  )
}

export const useLanguageFilters = () => {
  return useFilterStore(
    useShallow((state) => ({
      language: state.language,
      setLanguage: state.setLanguage
    }))
  )
}

export const useGenresFilters = () => {
  return useFilterStore(
    useShallow((state) => ({
      genres: state.genres,
      toggleGenre: state.toggleGenre,
      setGenres: state.setGenres
    }))
  )
}

export const useOriginCountryFilters = () => {
  return useFilterStore(
    useShallow((state) => ({
      originCountry: state.originCountry,
      setOriginCountry: state.setOriginCountry
    }))
  )
}
export const useWatchProvidersFilters = () => {
  return useFilterStore(
    useShallow((state) => ({
      watchProviders: state.watchProviders,
      setWatchProviders: state.setWatchProviders,
      watchRegion: state.watchRegion,
      setWatchRegion: state.setWatchRegion,
      toggleWatchProvider: state.toggleWatchProvider
    }))
  )
}

export default useFilters