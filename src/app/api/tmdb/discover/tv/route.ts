import tmdbFetcher from "maidana07/lib/api/tmdb"
import { SortBy } from "maidana07/types/TMDB/tmdb-fetcher"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') ?? "1"

  // Construir filtros desde query params
  // eslint-disable-next-line
  const filters: Record<string, any> = { page }

  const sortBy = searchParams.get('sortBy')
  if (sortBy && Object.values(SortBy).includes(sortBy as SortBy)) {
    filters.sortBy = sortBy as SortBy
  }

  const withGenres = searchParams.get('withGenres')
  if (withGenres) {
    filters.withGenres = withGenres.split(',')
  }

  const minYear = searchParams.get('minYear')
  const maxYear = searchParams.get('maxYear')
  if (minYear && maxYear) {
    filters.years = {
      minYear: parseInt(minYear),
      maxYear: parseInt(maxYear)
    }
  }

  const withOriginalLanguage = searchParams.get('withOriginalLanguage')
  if (withOriginalLanguage) {
    filters.withOriginalLanguage = withOriginalLanguage
  }

  const withOriginCountry = searchParams.get('withOriginCountry')
  if (withOriginCountry) {
    filters.withOriginCountry = withOriginCountry
  }

  const withWatchProviders = searchParams.get('withWatchProviders')
  if (withWatchProviders) {
    filters.withWatchProviders = withWatchProviders.split(',')
    const watchRegion = searchParams.get('watchRegion')
    if (watchRegion) {
      filters.watchRegion = watchRegion
    }
  }

  const data = await tmdbFetcher.getDiscoverTV(filters)

  return NextResponse.json({
    success: data.success,
    data: data.data,
    message: data.message
  })
}
