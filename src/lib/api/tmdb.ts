import fetcher from "maidana07/utils/fetcher";
import { GetDiscoverProps, GetTrendingProps, SortBy, TMDBResponse } from "maidana07/types/TMDB/tmdb-fetcher";

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

  private async fetch<T>(url: string, tag: string = 'tmdb', revalidate?: number): Promise<TMDBResponse<T>> {
    const response = await fetcher<T>({
      url,
      headers: this.headers,
      tags: [tag],
      revalidate,
      errorMessage: 'Error al realizar la petición a TMDB',
    });

    if (!response.success) {
      return {
        error: {
          status: 500,
          message: response.message
        }
      };
    }

    return { data: response.data };
  }

  async multiSearch(query: string): Promise<TMDBResponse<SearchResponse | []>> {
    const url = `${this.baseUrl}/search/multi?query=${query}&${this.queryLanguage}&page=1&include_adult=false`;
    return await this.fetch<SearchResponse>(url, "search", 3600);
  }


  getTrendingMovies = async (
    { time_window = "week", page = "1" }: GetTrendingProps = {}
  ): Promise<TMDBResponse<TrendingMovieResponse>> => {
    const url = `${this.baseUrl}/trending/movie/${time_window}?${this.queryLanguage}&page=${page}`;
    return await this.fetch<TrendingMovieResponse>(url, "trending-movies", CACHE_WEEK_TIME);
  }


  getTrendingTV = async (
    { time_window = "week", page = "1" }: GetTrendingProps = {}
  ): Promise<TMDBResponse<TrendingTVResponse>> => {
    const url = `${this.baseUrl}/trending/tv/${time_window}?${this.queryLanguage}&page=${page}`;
    return await this.fetch<TrendingTVResponse>(url, "trending-tv", CACHE_WEEK_TIME);
  }


  getDiscoverMovie = async (filters: GetDiscoverProps = {}): Promise<TMDBResponse<DiscoverMovieResponse>> => {
    const queryFilters = filtersForDiscover(filters);
    const url = `${this.baseUrl}/discover/movie?${this.queryLanguage}&${queryFilters.join("&")}`;

    return await this.fetch<DiscoverMovieResponse>(url, "discover-movies", CACHE_TIME);
  }

  getDiscoverTV = async (filters: GetDiscoverProps = {}): Promise<TMDBResponse<DiscoverTVResponse>> => {
    const queryFilters = filtersForDiscover(filters, "tv");
    const url = `${this.baseUrl}/discover/tv?${this.queryLanguage}&include_null_first_air_dates=false&${queryFilters.join("&")}`;

    return await this.fetch<DiscoverTVResponse>(url, "discover-tvs", CACHE_TIME);
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