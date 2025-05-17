import fetcher from "maidana07/utils/fetcher";

const CACHE_TIME = 86400 * 3; // 3 días

interface TMDBResponse<T> {
  data?: T | null;
  error?: {
    status: number;
    message: string | null;
  }
}

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


  getTrendingMovies = async (): Promise<TMDBResponse<TrendingMovieResponse>> => {
    const url = `${this.baseUrl}/trending/movie/day?${this.queryLanguage}`;
    // 24 horas (86400 segundos);
    return await this.fetch<TrendingMovieResponse>(url, "trending-movies", CACHE_TIME);
  }


  getTrendingTV = async (): Promise<TMDBResponse<TrendingTVResponse>> => {
    const url = `${this.baseUrl}/trending/tv/day?${this.queryLanguage}`;
    return await this.fetch<TrendingTVResponse>(url, "trending-tv", CACHE_TIME);
  }


  getDiscoverMovies = async ({
    page = "1",
    sortBy = "popularity.desc",
    includeAdult = false,
    includeVideo = false,
    // years = { minYear: 1900, maxYear: new Date().getFullYear() },
    // genres = [],
    // withWatchProviders = [],
    // withOriginCountry = "",
    // withOriginalLanguage = ""
  }): Promise<TMDBResponse<DiscoverMovieResponse>> => {
    const filters = [
      `sort_by=${sortBy}`,
      `page=${page}`,
      `include_adult=${includeAdult}`,
      `include_video=${includeVideo}`,
      // `with_genres=${genres.join(",")}`,
      // `with_watch_providers=${withWatchProviders.join(",")}`,
      // `primary_release_date.gte=${years.minYear}-01-01`,
      // `primary_release_date.lte=${years.maxYear}-12-31`,
      // `with_origin_country=${withOriginCountry}`,
      // `with_original_language=${withOriginalLanguage}`
    ];
    const url = `${this.baseUrl}/discover/movie?${this.queryLanguage}&${filters.join("&")}`;


    return await this.fetch<DiscoverMovieResponse>(url, "discover-movies", CACHE_TIME);
  }

}

const tmdbFetcher = new TMDBFetcher(process.env.TMDB_API_KEY ?? "");

export default tmdbFetcher;