/*
TVResult
  id: number;
  media_type: MediaType;
  popularity: number;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  original_language: string;
  name: string;
  original_name: string;
  first_air_date?: string;
*/

interface TVDetails extends TVResult {
  adult: boolean;
  created_by: CreatedBy[];
  episode_run_time: number[];
  genres: Genres[];
  homepage: string | null;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeToAir | null;
  next_episode_to_air: EpisodeToAir | null;
  networks: Companies[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  production_companies: Companies[];
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
    results: Video[]
  };
  recommendations: {
    results: MediaRecommendation[];
    page: number;
    total_results: number;
    total_pages: number;
  };
  aggregate_credits: {
    cast: Cast[];
    crew: Crew[];
  }
  tagline?: string;
}



type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

type EpisodeToAir = {
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


type Companies = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

type ProductionCountries = {
  iso_3166_1: string;
  name: string;
}

type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

type SpokenLanguages = {
  english_name: string;
  iso_639_1: string;
  name: string;
}

enum TVStatus {
  "Returning Series",
  "Planned",
  "In Production",
  "Ended",
  "Cancelled",
  "Pilot",
}

type WatchProviderItem = {
  link: string;
  flatrate: Array<{
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }>;
  rent: Array<{
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }>;
  buy: Array<{
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }>;
}

type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface MediaRecommendation extends TVResult {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean; vote_average: number;
}

interface Cast extends CastAndCrew {
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

interface Crew extends CastAndCrew {
  jobs: {
    credit_id: string;
    job: string;
    episode_count: number
  }[] | [];
  department: string;
}

enum Gender {
  "Not set / not specified" = 1,
  "Female" = 2,
  "Male" = 3,
  "Non-binary" = 4,
}