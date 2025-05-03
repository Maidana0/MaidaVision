import fetcher from "maidana07/utils/fetcher";

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

  constructor(api_key: string) {
    this.baseUrl = "https://api.themoviedb.org/3";
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
    const url = `${this.baseUrl}/search/multi?query=${query}&language=es-AR&page=1&include_adult=false`;
    return await this.fetch<SearchResponse>(url, "search");
  }


  async getTrendingMovies(): Promise<TMDBResponse<TrendingMovieResponse | []>> {
    const url = `${this.baseUrl}/trending/movie/day?language=es-AR`;
    // 24 horas (86400 segundos);
    return await this.fetch<TrendingMovieResponse>(url, "trendingMovies", 86400 * 3);

  }

  async getTrendingTV(): Promise<TMDBResponse<TrendingTVResponse>> {
    const url = `${this.baseUrl}/trending/tv/day?language=es-AR`;

    return await this.fetch<TrendingTVResponse>(url, "trendingTV", 86400 * 3);
  }
}

const tmdbFetcher = new TMDBFetcher(process.env.TMDB_API_KEY ?? "");

export default tmdbFetcher;