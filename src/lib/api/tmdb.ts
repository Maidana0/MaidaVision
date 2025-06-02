import fetcher from "maidana07/utils/fetcher";
import { GetDiscoverProps, GetTrendingProps } from "maidana07/types/TMDB/tmdb-fetcher";
import { CustomResponse } from "maidana07/types/fetcher-types";
import { filtersForDiscover } from "maidana07/utils/transform/filtersForDiscover";
import { DiscoverMovieResponse, DiscoverTVResponse, SearchResponse, TrendingMovieResponse, TrendingTVResponse } from "maidana07/types/TMDB/media-result";
import { MediaType } from "maidana07/types/TMDB/media/common/common-types";

const CACHE_MIN_TIME = 900; // 15 min
const CACHE_HOUR_TIME = 3600; // 1 hora
const CACHE_DAY_TIME = 86400; // 1 día
// const CACHE_TIME = CACHE_DAY_TIME * 3; // 3 días
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
        tag?: string,
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
      url,
      tag: page === "1" ? "trending-movies" : undefined,
      revalidate: page === "1" ? (time_window === "week" ? CACHE_WEEK_TIME : CACHE_DAY_TIME) : undefined,
      requestMessage: "trending-movies"
    });
  }


  getTrendingTV = async (
    { time_window = "week", page = "1" }: GetTrendingProps = {}
  ): Promise<CustomResponse<TrendingTVResponse>> => {
    const url = `${this.baseUrl}/trending/tv/${time_window}?${this.queryLanguage}&page=${page}`;
    return await this.fetch<TrendingTVResponse>({
      url,
      tag: page === "1" ? "trending-tv" : undefined,
      revalidate: page === "1" ? (time_window === "week" ? CACHE_WEEK_TIME : CACHE_DAY_TIME) : undefined,
      requestMessage: "trending-tv"
    });
  }


  getDiscoverMovie = async (filters: GetDiscoverProps = {}): Promise<CustomResponse<DiscoverMovieResponse>> => {
    const queryFilters = filtersForDiscover(filters);
    const url = `${this.baseUrl}/discover/movie?${this.queryLanguage}&${queryFilters.join("&")}`;

    return await this.fetch<DiscoverMovieResponse>({
      url,
      tag: "discover-movies",
      revalidate: CACHE_MIN_TIME,
      requestMessage: "discover-movies"
    });
  }

  getDiscoverTV = async (filters: GetDiscoverProps = {}): Promise<CustomResponse<DiscoverTVResponse>> => {
    const queryFilters = filtersForDiscover(filters, "tv");
    const url = `${this.baseUrl}/discover/tv?${this.queryLanguage}&include_null_first_air_dates=false&${queryFilters.join("&")}`;

    return await this.fetch<DiscoverTVResponse>({
      url, tag: "discover-tvs", revalidate: CACHE_MIN_TIME, requestMessage: "discover-tvs"
    });
  }


  getMediaDetails = async <T>({ mediaType, id }: { mediaType: MediaType, id: string }) => {
    const url = `${this.baseUrl}/${mediaType}/${id}?${this.queryLanguage}&append_to_response
=watch/providers,aggregate_credits,videos,recommendations,similar&locale=AR&include_video_language=es-MX,en`

    return await this.fetch<T>({
      url,
      tag: `${mediaType}-detail`,
      revalidate: CACHE_HOUR_TIME,
      requestMessage: `${mediaType}-detail`
    })
  }

  getMediaImages = async ({ mediaType, id, includeImageLanguage = ["es"] }: { mediaType: MediaType, id: string, includeImageLanguage: string[] }) => {
    const url = `${this.baseUrl}/${mediaType}/${id}/images?${this.queryLanguage}&include_image_language=${includeImageLanguage.join(",")}`

    return await this.fetch({ url })
  }

}
// include_image_language= null para mostrar fotos

const tmdbFetcher = new TMDBFetcher(process.env.TMDB_API_KEY ?? "");

export default tmdbFetcher;