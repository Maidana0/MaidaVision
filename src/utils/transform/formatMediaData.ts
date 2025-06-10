import genres from "maidana07/lib/api/genres.json"
import { MovieResult } from "maidana07/types/TMDB/media/movie-detail";
import { TVResult } from "maidana07/types/TMDB/media/tv-detail";

function isMovie(media: MovieResult | TVResult): media is MovieResult {
  return 'title' in media;
}

export function mediaResultIsMovie(media: Omit<MovieResult, "media_type"> | Omit<TVResult, "media_type">): media is Omit<MovieResult, "media_type"> {
  return 'title' in media
}

function getGenres(genreIds: number[] = [], genresList: { id: number, name: string }[]): string[] {
  return genreIds
    .map(id => genresList.find(g => g.id === id)?.name)
    .filter(Boolean) as string[];
}


export const formatMediaData = (mediaArray: MovieResult[] | TVResult[]): TrendingMedia[] => {
  if (!mediaArray) return [];
  const genresList = isMovie(mediaArray[0]) ? genres.movie : genres.tv;


  return mediaArray.map((media, i) => ({
    id: media.id,
    position: i + 1,
    overview: media.overview ?? "",
    title: isMovie(media) ? media.title : media.name,
    genres: getGenres(media.genre_ids, genresList),
    media_type: isMovie(media) ? "pelicula" : "serie",
    release_date: (isMovie(media) ? media.release_date : media.first_air_date)?.slice(0, 4) ?? "",
    backdrop_url: media.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${media.backdrop_path}`
      : "https://placehold.co/780x439?text=No+Backdrop",
    poster_url: media.poster_path
      ? `https://image.tmdb.org/t/p/w185${media.poster_path}`
      : "https://placehold.co/196x294?text=No+Image",
  })
  );
};



export function translateGenres(
  { originalGenresList, type }: {
    originalGenresList: { id: number, name: string }[],
    type: "tv" | "movie"
  }): string[] {
  if (type === "tv") {
    return originalGenresList
      .map(({ id }) => genres.tv.find(g => g.id === id)?.name)
      .filter(Boolean) as string[];
  } else if (type === "movie") {
    return originalGenresList
      .map(({ id }) => genres.movie.find(g => g.id === id)?.name)
      .filter(Boolean) as string[];
  }

  return []
}