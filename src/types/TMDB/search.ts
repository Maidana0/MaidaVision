
export type MediaTypes = string | "multi" | "person" | "tv" | "movie"

export interface SearchProps {
  type?: MediaTypes,
  page?: number,
}