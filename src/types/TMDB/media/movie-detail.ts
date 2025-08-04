import { BaseMediaResult, BaseMovieAndTVResult, TMDBBaseResponse } from "../media-result";
import { Company, CreatedBy, Genres, MediaVideo, MovieStatus, ProductionCountries, WatchProviderItem } from "./common/common-types";


export interface MovieResult extends BaseMovieAndTVResult, BaseMediaResult {
  adult: boolean;
  title: string;
  original_title: string;
  release_date?: string;
  video: boolean;
}

export interface MovieDetails extends MovieResult {
  belongs_to_collection: BelongToCollectionType
  budget: number;
  genres: Genres[];
  homepage: string | null;
  status: MovieStatus;
  tagline: string;
  runtime: number;
  revenue: number;
  imdb_id: string;
  'watch/providers': {
    results: {
      AR: WatchProviderItem;
    };
  };
  recommendations: TMDBBaseResponse<MovieResult[]>;
  similar: TMDBBaseResponse<MovieResult[]>;
  videos: {
    results: MediaVideo[]
  };
  production_companies: Company[];
  production_countries: ProductionCountries[];
  created_by: CreatedBy[] | [];
  credits: {
    cast: MovieCast[];
    crew: MovieCrew[];
  };
}

export type BelongToCollectionType = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}


type MovieCastAndCrew = {
  "adult": boolean;
  "gender": 0 | 1 | 2 | 3;
  "id": number;
  "known_for_department": string;
  "name": string;
  "original_name": string;
  "popularity": number,
  "profile_path": string;
  "credit_id": string;
}

export type MovieCast = MovieCastAndCrew & {
  "cast_id": number;
  "character": string;
  "order": number
}
export type MovieCrew = MovieCastAndCrew & {
  "department": string,
  "job": string
}