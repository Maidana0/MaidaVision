/* eslint-disable @typescript-eslint/no-empty-object-type */

import { MediaType } from "./media/common/common-types";
import { MovieResult } from "./media/movie-detail";
import { PersonResult } from "./media/person-detail";
import { TVResult } from "./media/tv-detail";

// BASES
export interface BaseMediaResult {
  id: number;
  media_type: MediaType;
  popularity: number;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
}

export interface BaseMovieAndTVResult {
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  original_language: string;
}

// GENERALIZADO
export interface MultiSearchItem extends Partial<BaseMediaResult>, Partial<PersonResult>, Partial<BaseMovieAndTVResult> {
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
export interface TMDBBaseResponse<T> {
  results: T
  page: number;
  total_pages: number;
  total_results: number;
}


export interface SearchResponse extends TMDBBaseResponse<MultiSearchItem[]> {
}
export interface TrendingMovieResponse extends TMDBBaseResponse<MovieResult[]> {
}
export interface TrendingTVResponse extends TMDBBaseResponse<TVResult[]> {
}


export interface DiscoverMovieResponse extends TMDBBaseResponse<Omit<MovieResult, "media_type">[]> {
}

export interface DiscoverTVResponse extends TMDBBaseResponse<Omit<TVResult, "media_type">[]> {
}