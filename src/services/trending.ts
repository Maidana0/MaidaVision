import { CustomResponse } from "maidana07/types/fetcher-types";
import fetcher from "maidana07/utils/fetcher";



export const trendingMovies = async (): Promise<CustomResponse<TrendingMovieResponse>> => {
  const url = "/api/tmdb/trending/movie"
  const data = await fetcher<TrendingMovieResponse>({
    url,
    successMessage: "Tendencias de películas obtenidas exitosamente",
    errorMessage: "Ocurrió un error al intentar obtener las películas en tendencia."
  })

  if (!data.success) console.error("Información del error: ", data.serverMessage);

  return data;
}



export const trendingTVs = async (): Promise<CustomResponse<TrendingTVResponse>> => {
  const url = "/api/tmdb/trending/tv"
  const data = await fetcher<TrendingTVResponse>({
    url,
    successMessage: "Tendencias de series obtenidas exitosamente",
    errorMessage: "Ocurrió un error al intentar obtener las series en tendencia."
  })

  if (!data.success) console.error("Información del error: ", data.serverMessage);

  return data;
}
