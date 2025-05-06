import genres from "maidana07/lib/api/genres.json"

function isMovie(media: MovieResult | TVResult): media is MovieResult {
  return 'title' in media;
}

function getGenres(genreIds: number[]): string[] {
  const genresToString = genreIds.map(id => {
    const genre = genres.find(g => g.id === id)
    if (genre) return genre.name;
  }).filter(Boolean) as string[];

  return genresToString;
}




export const formatMediaData = (mediaArray: TVResult[] | MovieResult[]): TrendingMedia[] => {


  return mediaArray.map((media, i) => ({
    id: media.id,
    position: i + 1,
    overview: media.overview ?? "",
    title: isMovie(media) ? media.title : media.name,
    genres: getGenres(media.genre_ids),
    media_type: isMovie(media) ? "Película" : "Serie",
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