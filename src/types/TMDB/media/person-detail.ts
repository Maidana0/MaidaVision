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
  homepage: string | null,
  id: number,
  imdb_id: string,
  name: string,
  place_of_birth: string,
  popularity: number,
  also_known_as: string[],
  combined_credits: CombinedCredits,
  images: PersonImages
}




type MediaCredit = {
  adult: boolean,
  backdrop_path: string | null,
  genre_ids: number[],
  id: number,
  original_language: string,
  overview: string,
  popularity: number,
  poster_path: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
  credit_id: string,
  media_type: "movie" | "tv"

}

type TVCredit = MediaCredit & {
  origin_country: string[],
  original_name: string,
  first_air_date: Date,
  name: string,
  character: string,
  credit_id: string
  episode_count: number,
  first_credit_air_date: Date,
}

type MovieCredit = MediaCredit & {
  title: string,
  original_title: string,
  release_date: Date,
}

export interface CombinedCredits {
  cast: Array<(TVCredit | MovieCredit) & {
    character: string,
    order: number,
  }>,
  crew: Array<(TVCredit | MovieCredit) & {
    department: string,
    job: string
  }>,
}


export interface PersonImages {
  profiles: Array<{
    aspect_ratio: number,
    height: number,
    iso_639_1: string | null,
    file_path: string,
    vote_average: number,
    vote_count: number,
    width: number,
  }>
}