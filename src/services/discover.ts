import { CustomResponse } from "maidana07/types/fetcher-types"
import { DiscoverMovieResponse, DiscoverTVResponse } from "maidana07/types/TMDB/media-result";
import { GetDiscoverProps } from "maidana07/types/TMDB/tmdb-fetcher"
import fetcher from "maidana07/utils/fetcher"

export const discoverMovies = async (page: number, filters?: GetDiscoverProps): Promise<CustomResponse<DiscoverMovieResponse>> => {
  const params = new URLSearchParams()
  params.set('page', page.toString())
  
  if (filters) {
    if (filters.sortBy) params.set('sortBy', filters.sortBy)
    if (filters.withGenres && filters.withGenres.length > 0) {
      params.set('withGenres', filters.withGenres.join(','))
    }
    if (filters.years) {
      params.set('minYear', filters.years.minYear.toString())
      params.set('maxYear', filters.years.maxYear.toString())
    }
    if (filters.withOriginalLanguage) params.set('withOriginalLanguage', filters.withOriginalLanguage)
    if (filters.withOriginCountry) params.set('withOriginCountry', filters.withOriginCountry)
    if (filters.withWatchProviders && filters.withWatchProviders.length > 0) {
      params.set('withWatchProviders', filters.withWatchProviders.join(','))
      if (filters.watchRegion) params.set('watchRegion', filters.watchRegion)
    }
  }

  const url = `/api/tmdb/discover/movie?${params.toString()}`
  
  const data = await fetcher<DiscoverMovieResponse>({
    url,
    successMessage: "Películas descubiertas exitosamente",
    errorMessage: "Ocurrió un error al intentar obtener las películas."
  })

  if (!data.success) console.error("Información del error: ", data.serverMessage)

  return data
}

export const discoverTVs = async (page: number, filters?: GetDiscoverProps): Promise<CustomResponse<DiscoverTVResponse>> => {
  const params = new URLSearchParams()
  params.set('page', page.toString())
  
  if (filters) {
    if (filters.sortBy) params.set('sortBy', filters.sortBy)
    if (filters.withGenres && filters.withGenres.length > 0) {
      params.set('withGenres', filters.withGenres.join(','))
    }
    if (filters.years) {
      params.set('minYear', filters.years.minYear.toString())
      params.set('maxYear', filters.years.maxYear.toString())
    }
    if (filters.withOriginalLanguage) params.set('withOriginalLanguage', filters.withOriginalLanguage)
    if (filters.withOriginCountry) params.set('withOriginCountry', filters.withOriginCountry)
    if (filters.withWatchProviders && filters.withWatchProviders.length > 0) {
      params.set('withWatchProviders', filters.withWatchProviders.join(','))
      if (filters.watchRegion) params.set('watchRegion', filters.watchRegion)
    }
  }

  const url = `/api/tmdb/discover/tv?${params.toString()}`
  
  const data = await fetcher<DiscoverTVResponse>({
    url,
    successMessage: "Series descubiertas exitosamente",
    errorMessage: "Ocurrió un error al intentar obtener las series."
  })

  if (!data.success) console.error("Información del error: ", data.serverMessage)

  return data
}

// Mantener funciones legacy para compatibilidad
export const discoverMovie = async (): Promise<CustomResponse<DiscoverMovieResponse>> => {
  const data = await fetcher<DiscoverMovieResponse>({
    url: "/api/tmdb/discover/movie", successMessage: "", errorMessage: ""
  })

  return data;
}

export const discoverTV = async (): Promise<CustomResponse<DiscoverTVResponse>> => {
  const data = await fetcher<DiscoverTVResponse>({
    url: "/api/tmdb/discover/tv", successMessage: "", errorMessage: ""
  })

  return data;
}