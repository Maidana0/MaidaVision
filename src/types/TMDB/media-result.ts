/* eslint-disable @typescript-eslint/no-unused-vars */

type MediaType = 'movie' | 'tv' | 'person' | 'unknown';

// BASES
interface BaseMediaResult {
  id: number;
  media_type: MediaType;
  popularity: number;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
}

interface BaseMovieAndTVResult {
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  original_language: string;
}


//  ESPECIFICOS
interface MovieResult extends BaseMovieAndTVResult, BaseMediaResult {
  adult: boolean;
  title: string;
  original_title: string;
  release_date?: string;
  video: boolean;
}

interface TVResult extends BaseMovieAndTVResult, BaseMediaResult {
  name: string;
  original_name: string;
  first_air_date?: string;
}

interface PersonResult {
  known_for: Array<MovieResult | TVResult>;
  profile_path: string;
  gender: number;
  known_for_department: string;
}


// GENERALIZADO
interface MultiSearchItem extends Partial<BaseMediaResult>, Partial<PersonResult>, Partial<BaseMovieAndTVResult> {
  adult?: boolean;
  original_title?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  year?: string;
  media_type: MediaType;
}


// RESPUESTA DE PETICIONES
interface TMDBBaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}


interface SearchResponse extends TMDBBaseResponse {
  results: MultiSearchItem[];
}
interface TrendingMovieResponse extends TMDBBaseResponse {
  results: MovieResult[];
}
interface TrendingTVResponse extends TMDBBaseResponse {
  results: TVResult[];
}


interface DiscoverMovieResponse extends TMDBBaseResponse {
  results: Omit<MovieResult, "media_type">[]
}

interface DiscoverTVResponse extends TMDBBaseResponse {
  results: Omit<TVResult, "media_type">[]
}