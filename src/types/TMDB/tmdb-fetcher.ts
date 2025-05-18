export interface TMDBResponse<T> {
  data?: T | null;
  error?: {
    status: number;
    message: string | null;
  }
}

export interface GetTrendingProps {
  time_window?: "day" | "week";
  page?: string;
}

export enum SortBy {
  TITLE_DESC = "title.desc",
  TITLE_ASC = "title.asc",
  POPULARITY_DESC = "popularity.desc",
  POPULARITY_ASC = "popularity.asc",
  PRIMARY_RELEASE_DATE_DESC = "primary_release_date.desc",
  PRIMARY_RELEASE_DATE_ASC = "primary_release_date.asc",
  VOTE_AVERAGE_DESC = "vote_average.desc",
  VOTE_AVERAGE_ASC = "vote_average.asc",
  REVENUE_DESC = "revenue.desc",
  REVENUE_ASC = "revenue.asc"
}

export interface BaseGetDiscoverProps {
  page: string;
  sortBy: SortBy;
  includeAdult: false;
  includeVideo: false;
}