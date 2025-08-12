import { BaseMediaResult, BaseMovieAndTVResult, TMDBBaseResponse } from "../media-result";
import { Company, Genres, ProductionCountries, SpokenLanguages, TVStatus, MediaVideo, WatchProviderItem, CreatedBy } from "./common/common-types";
export interface TVResult extends BaseMovieAndTVResult, BaseMediaResult {
  name: string;
  original_name: string;
  first_air_date?: string;
}

export interface TVDetails extends TVResult {
  adult: boolean;
  created_by: CreatedBy[] | [];
  episode_run_time: number[];
  genres: Genres[];
  homepage: string | null;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeToAir | null;
  next_episode_to_air: EpisodeToAir | null;
  networks: Company[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  production_companies: Company[];
  production_countries: ProductionCountries[];
  seasons: Season[];
  spoken_languages: SpokenLanguages[];
  status: TVStatus;
  type: string;
  'watch/providers': {
    results: {
      AR: WatchProviderItem;
    };
  };
  videos: {
    results: MediaVideo[]
  };
  recommendations: TMDBBaseResponse<MediaRecommendation[]>;
  similar: TMDBBaseResponse<MediaRecommendation[]>;
  aggregate_credits: {
    cast: Cast[];
    crew: Crew[];
  }
  tagline?: string;
}


export type EpisodeToAir = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
}




export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}


export interface MediaRecommendation extends TVResult {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean; vote_average: number;
}

export interface Cast extends CastAndCrew {
  roles: {
    credit_id: string;
    character: string;
    episode_count: number;
  }[];
  order: number;
}

type CastAndCrew = {
  adult: boolean;
  gender: Gender;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  total_episode_count: number
}

export interface Crew extends CastAndCrew {
  jobs: {
    credit_id: string;
    job: string;
    episode_count: number
  }[] | [];
  department: string;
}

export enum Gender {
  "Not set / not specified" = 1,
  "Female" = 2,
  "Male" = 3,
  "Non-binary" = 4,
}