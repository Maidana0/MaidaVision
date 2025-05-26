import fetcher from "maidana07/utils/fetcher";
import { GetDiscoverProps, GetTrendingProps, SortBy } from "maidana07/types/TMDB/tmdb-fetcher";
import { CustomResponse } from "maidana07/types/fetcher-types";

const CACHE_MIN_TIME = 900; // 15 min
const CACHE_HOUR_TIME = 3600; // 1 hora
const CACHE_DAY_TIME = 86400; // 1 día
const CACHE_TIME = CACHE_DAY_TIME * 3; // 3 días
const CACHE_WEEK_TIME = CACHE_DAY_TIME * 7; // 1 semana


class TMDBFetcher {
  private apiKey: string;
  private baseUrl: string;
  private headers: HeadersInit;
  private queryLanguage: string;

  constructor(api_key: string) {
    this.baseUrl = "https://api.themoviedb.org/3";
    this.queryLanguage = "language=es-MX";
    this.apiKey = api_key;
    this.headers = {
      'Authorization': `Bearer ${this.apiKey}`
    };
  }

  private async fetch<T>(
    { url, tag, revalidate, requestMessage }
      : {
        url: string,
        tag: string,
        revalidate?: number,
        requestMessage?: string
      }
  ): Promise<CustomResponse<T>> {
    const response = await fetcher<T>({
      url,
      headers: this.headers,
      tags: tag ? [tag] : undefined,
      revalidate,
      errorMessage: 'Error during a request to TheMovieDB',
      successMessage: `The request to TheMovieDB ${requestMessage} was successful.`
    });

    if (!response.success) {
      return {
        success: false,
        data: null,
        message: response.message
      };
    }

    return {
      success: true,
      data: response.data,
      message: response.message
    };
  }

  async multiSearch(query: string): Promise<CustomResponse<SearchResponse | []>> {
    const url = `${this.baseUrl}/search/multi?query=${query}&${this.queryLanguage}&page=1&include_adult=false`;
    return await this.fetch<SearchResponse>({
      url, tag: "search", revalidate: CACHE_MIN_TIME, requestMessage: "search"
    });
  }


  getTrendingMovies = async (
    { time_window = "week", page = "1" }: GetTrendingProps = {}
  ): Promise<CustomResponse<TrendingMovieResponse>> => {
    const url = `${this.baseUrl}/trending/movie/${time_window}?${this.queryLanguage}&page=${page}`;
    return await this.fetch<TrendingMovieResponse>({
      url, tag: "trending-movies", revalidate: CACHE_WEEK_TIME, requestMessage: "trending-movies"
    });
  }


  getTrendingTV = async (
    { time_window = "week", page = "1" }: GetTrendingProps = {}
  ): Promise<CustomResponse<TrendingTVResponse>> => {
    const url = `${this.baseUrl}/trending/tv/${time_window}?${this.queryLanguage}&page=${page}`;
    return await this.fetch<TrendingTVResponse>({
      url, tag: "trending-tv", revalidate: CACHE_WEEK_TIME, requestMessage: "trending-tv"
    });
  }


  getDiscoverMovie = async (filters: GetDiscoverProps = {}): Promise<CustomResponse<DiscoverMovieResponse>> => {
    const queryFilters = filtersForDiscover(filters);
    const url = `${this.baseUrl}/discover/movie?${this.queryLanguage}&${queryFilters.join("&")}`;

    return await this.fetch<DiscoverMovieResponse>({
      url, tag: "discover-movies", revalidate: CACHE_MIN_TIME, requestMessage: "discover-movies"
    });
  }

  getDiscoverTV = async (filters: GetDiscoverProps = {}): Promise<CustomResponse<DiscoverTVResponse>> => {
    const queryFilters = filtersForDiscover(filters, "tv");
    const url = `${this.baseUrl}/discover/tv?${this.queryLanguage}&include_null_first_air_dates=false&${queryFilters.join("&")}`;

    return await this.fetch<DiscoverTVResponse>({
      url, tag: "discover-tvs", revalidate: CACHE_MIN_TIME, requestMessage: "discover-tvs"
    });
  }

}

function filtersForDiscover({
  page = "1",
  sortBy = SortBy.POPULARITY_DESC,
  includeAdult = false,
  includeVideo = false,
  watchRegion = "AR",
  withWatchProviders,
  withGenres,
  withOriginCountry,
  withOriginalLanguage,
  years,
}: GetDiscoverProps, isFor: "movie" | "tv" = "movie") {

  // --------------
  // filtros por defecto (que pueden cambiar igual pero siempre son recibidos)
  // --------------
  const filtersToReturn = [
    `sort_by=${sortBy}`,
    `page=${page}`,
    `include_adult=${includeAdult}`,
    `include_video=${includeVideo}`,
  ];


  // --------------
  // filtros opcionales (que no son enviados si no se reciben)
  // --------------
  if (withGenres) filtersToReturn.push(`with_genres=${withGenres.join(",")}`);
  if (withOriginalLanguage) filtersToReturn.push(`with_original_language=${withOriginalLanguage}`);
  if (withOriginCountry) filtersToReturn.push(`with_origin_country=${withOriginCountry}`);

  if (withWatchProviders) {
    filtersToReturn.push(
      `watch_region=${watchRegion}`,
      `with_watch_providers=${withWatchProviders.join(",")}`
    )
  };

  if (years) {
    const today = new Date();
    const minDate = `${years.minYear}-01-01`
    const maxDate = years.maxYear === today.getFullYear()
      ? today.toISOString().split("T")[0]
      : `${years.maxYear}-12-31`

    if (isFor === "tv") {
      filtersToReturn.push(
        `first_air_date.gte=${minDate}`,
        `first_air_date.lte=${maxDate}`
      )
    } else {
      filtersToReturn.push(
        `primary_release_date.gte=${minDate}`,
        `primary_release_date.lte=${maxDate}`
      )
    }
  };


  // ------- RETORNO -------
  return filtersToReturn;
}

const tmdbFetcher = new TMDBFetcher(process.env.TMDB_API_KEY ?? "");

export default tmdbFetcher;