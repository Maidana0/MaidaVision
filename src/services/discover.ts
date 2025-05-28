import { CustomResponse } from "maidana07/types/fetcher-types"
import fetcher from "maidana07/utils/fetcher"


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