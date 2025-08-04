import { MovieResult } from "./movie-detail";
import { TVResult } from "./tv-detail";

export type PersonKnownFor = {
  known_for: Array<MovieResult | TVResult>
}

export interface PersonResult extends PersonKnownFor {
  profile_path: string;
  gender: number;
  known_for_department: string;
}