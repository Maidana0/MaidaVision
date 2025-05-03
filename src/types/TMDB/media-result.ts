


// BASES
interface BaseMediaResult {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
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
  media_type: 'movie' | 'tv' | 'person';
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
  results: PersonResult[];
}


//  del historial

interface HistoryItem {
  id: number;
  title: string;
  year?: string;
  poster_path: string | null;
  media_type: 'movie' | 'tv' | 'person';
}