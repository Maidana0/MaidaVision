
function isMovie(media: MovieResult | TVResult): media is MovieResult {
  return 'title' in media;
}

export const formatMediaData = (mediaArray: TVResult[] | MovieResult[]): TrendingMedia[] => {
  return mediaArray.map((media, i) => ({
    id: media.id,
    position: i + 1,
    backdrop_url: media.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${media.backdrop_path}`
      : "https://placehold.co/780x439?text=No+Backdrop",
    overview: media.overview ?? "La descripción no está disponible.",
    title: isMovie(media) ? media.title : media.name,
    poster_url: media.poster_path
      ? `https://image.tmdb.org/t/p/w185${media.poster_path}`
      : "https://placehold.co/196x294?text=No+Image",
  }));
};