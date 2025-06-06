/* eslint-disable @typescript-eslint/no-unused-vars */

interface TrendingMedia {
  id: number;
  position: number;
  poster_url: string;
  backdrop_url: string;
  overview: string;
  title: string;
  genres: string[];
  release_date: string;
  media_type: "pelicula" | "serie";
}