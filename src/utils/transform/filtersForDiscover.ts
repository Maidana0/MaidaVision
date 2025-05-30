import { GetDiscoverProps, SortBy } from "maidana07/types/TMDB/tmdb-fetcher";


export function filtersForDiscover({
  page = "1",
  sortBy = SortBy.POPULARITY_DESC,
  includeAdult = false,
  includeVideo = false,
  watchRegion = "AR",
  withWatchProviders,
  withGenres,
  withOriginCountry,
  withOriginalLanguage,
  years,
}: GetDiscoverProps, isFor: "movie" | "tv" = "movie") {

  // --------------
  // filtros por defecto (que pueden cambiar igual pero siempre son recibidos)
  // --------------
  const filtersToReturn = [
    `sort_by=${sortBy}`,
    `page=${page}`,
    `include_adult=${includeAdult}`,
    `include_video=${includeVideo}`,
  ];


  // --------------
  // filtros opcionales (que no son enviados si no se reciben)
  // --------------
  if (withGenres) filtersToReturn.push(`with_genres=${withGenres.join(",")}`);
  if (withOriginalLanguage) filtersToReturn.push(`with_original_language=${withOriginalLanguage}`);
  if (withOriginCountry) filtersToReturn.push(`with_origin_country=${withOriginCountry}`);

  if (withWatchProviders) {
    filtersToReturn.push(
      `watch_region=${watchRegion}`,
      `with_watch_providers=${withWatchProviders.join(",")}`
    )
  };

  if (years) {
    const today = new Date();
    const minDate = `${years.minYear}-01-01`
    const maxDate = years.maxYear === today.getFullYear()
      ? today.toISOString().split("T")[0]
      : `${years.maxYear}-12-31`

    if (isFor === "tv") {
      filtersToReturn.push(
        `first_air_date.gte=${minDate}`,
        `first_air_date.lte=${maxDate}`
      )
    } else {
      filtersToReturn.push(
        `primary_release_date.gte=${minDate}`,
        `primary_release_date.lte=${maxDate}`
      )
    }
  };


  // ------- RETORNO -------
  return filtersToReturn;
}