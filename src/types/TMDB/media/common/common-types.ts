

export type MediaType = 'movie' | 'tv' | 'person';
export type Genres = { id: number; name: string }

export enum TVStatus {
  "Returning Series" = "Returning Series",
  "Planned" = "Planned",
  "In Production" = "In Production",
  "Ended" = "Ended",
  "Cancelled" = "Cancelled",
  "Pilot" = "Pilot"
}


export type Company = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export type ProductionCountries = {
  iso_3166_1: string;
  name: string;
}

export type SpokenLanguages = {
  english_name: string;
  iso_639_1: string;
  name: string;
}



export type WatchProviderItem = {
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

export type MediaVideo = {
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