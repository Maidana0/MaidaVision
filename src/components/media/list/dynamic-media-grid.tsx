"use client"
import { useCallback, useEffect, useRef } from "react"
import { useInfinityScroll } from "maidana07/hooks/use-infinity-scroll"
import { trendingMovies, trendingTVs } from "maidana07/services/trending"
import { GetDiscoverProps } from "maidana07/types/TMDB/tmdb-fetcher"
import { CustomResponse } from "maidana07/types/fetcher-types"
import MediaCard from "maidana07/components/cards/media-card"
import LoadMoreTrigger from "./load-more-trigger"
import { TrendingMovieResponse, TrendingTVResponse } from "maidana07/types/TMDB/media-result"
import { TVResult } from "maidana07/types/TMDB/media/tv-detail"
import { MovieResult } from "maidana07/types/TMDB/media/movie-detail"

interface MediaGridProps {
  mediaType?: "pelicula" | "serie"
  filters?: GetDiscoverProps
  initialData: CustomResponse<TrendingTVResponse | TrendingMovieResponse>
}

export default function DynamicMediaGrid({
  initialData,
  mediaType = "pelicula",
  filters
}: MediaGridProps) {
  const prevFiltersRef = useRef(filters)
  const { data: serverData } = initialData

  const cb = useCallback(async (nextPage: number) => {
    const { data, success, message } =
      mediaType === "pelicula"
        ? await trendingMovies(nextPage)
        : await trendingTVs(nextPage)

    return {
      success,
      hasMorePages: data ? data.page < data.total_pages : false,
      items: data?.results ?? [],
      message
    }
  }, [mediaType])

  const { items, isPending, errorMessage, targetRef, reset } = useInfinityScroll<MovieResult | TVResult>({
    initialState: serverData?.results ?? [],
    initialHasMorePage: serverData ? (serverData.total_pages > serverData.page) : false,
    cb
  })

  useEffect(() => {
    const currentFilters = JSON.stringify(filters)
    const previousFilters = JSON.stringify(prevFiltersRef.current)

    if (currentFilters !== previousFilters) {
      prevFiltersRef.current = filters
      reset()
    }
  }, [filters, reset])

  return (
    <section className="space-y-4 pb-10 min-h-[100dvh]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((media, i) => (
          <MediaCard
            priority={i < 15}
            key={media.id}
            media={media}
            mediaType={mediaType}
            withScale
          />
        ))}
      </div>

      <LoadMoreTrigger
        ref={targetRef}
        isLoading={isPending}
        error={errorMessage}
      />
    </section>
  )
}