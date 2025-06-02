import { CustomResponse } from "maidana07/types/fetcher-types";
import { TrendingMovieResponse, TrendingTVResponse } from "maidana07/types/TMDB/media-result";
import fetcher from "maidana07/utils/fetcher";



export const trendingMovies = async (page: number): Promise<CustomResponse<TrendingMovieResponse>> => {
  const url = `/api/tmdb/trending/movie?page=${page}`
  const data = await fetcher<TrendingMovieResponse>({
    url,
    successMessage: "Tendencias de películas obtenidas exitosamente",
    errorMessage: "Ocurrió un error al intentar obtener las películas en tendencia."
  })

  if (!data.success) console.error("Información del error: ", data.serverMessage);

  return data;
}



export const trendingTVs = async (page: number): Promise<CustomResponse<TrendingTVResponse>> => {
  const url = `/api/tmdb/trending/tv?page=${page}`
  const data = await fetcher<TrendingTVResponse>({
    url,
    successMessage: "Tendencias de series obtenidas exitosamente",
    errorMessage: "Ocurrió un error al intentar obtener las series en tendencia."
  })

  if (!data.success) console.error("Información del error: ", data.serverMessage);

  return data;
}
