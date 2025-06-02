import { MovieResult } from "./movie-detail";
import { TVResult } from "./tv-detail";



export interface PersonResult {
  known_for: Array<MovieResult | TVResult>;
  profile_path: string;
  gender: number;
  known_for_department: string;
}