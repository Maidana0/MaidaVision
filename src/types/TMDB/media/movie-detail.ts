import { BaseMediaResult, BaseMovieAndTVResult } from "../media-result";
import { Genres, MovieStatus } from "./common/common-types";


export interface MovieResult extends BaseMovieAndTVResult, BaseMediaResult {
  adult: boolean;
  title: string;
  original_title: string;
  release_date?: string;
  video: boolean;
}

export interface MovieDetails extends MovieResult {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  }
  budget: number;
  genres: Genres[];
  homepage: string | null;
  status: MovieStatus;
  tagline: string;


}
