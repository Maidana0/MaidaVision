import { BaseMediaResult, BaseMovieAndTVResult } from "../media-result";


export interface MovieResult extends BaseMovieAndTVResult, BaseMediaResult {
  adult: boolean;
  title: string;
  original_title: string;
  release_date?: string;
  video: boolean;
}