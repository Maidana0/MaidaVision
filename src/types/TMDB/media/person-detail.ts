import { MovieResult } from "./movie-detail";
import { Gender, TVResult } from "./tv-detail";

export type PersonKnownFor = {
  known_for: Array<MovieResult | TVResult>
}

export interface PersonResult extends PersonKnownFor {
  profile_path: string;
  gender: Gender;
  known_for_department: string;
}


export interface PersonDetails extends Omit<PersonResult, "known_for"> {
  adult: boolean,
  biography: string,
  birthday: Date,
  deathday: Date | null,
  homepage: string,
  id: number,
  imdb_id: string,
  name: string,
  place_of_birth: string,
  popularity: number,
  also_known_as: string[],
  credits: PersonCredits
}




type MediaCredit = {
  adult: boolean,
  backdrop_path: string | null,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
  credit_id: string,
}


export interface PersonCredits {
  cast: Array<MediaCredit & {
    character: string
    order: number,

  }>,
  crew: Array<MediaCredit & {
    department: string,
    job: string
  }>,
}