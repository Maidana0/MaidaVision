import Image from "next/image"
import tmdbFetcher from "maidana07/lib/api/tmdb"
import MediaPagination from "./media-pagination"
import Link from "next/link"
import { GetDiscoverProps } from "maidana07/types/TMDB/tmdb-fetcher";
import { Suspense } from "react";
import { MovieResult } from "maidana07/types/TMDB/media/movie-detail";
import { TVResult } from "maidana07/types/TMDB/media/tv-detail";


function isMovie(media: Omit<MovieResult, "media_type"> | Omit<TVResult, "media_type">): media is Omit<MovieResult, "media_type"> {
  return 'title' in media;
}

interface MediaGridProps {
  searchParams: Promise<{ [key: string]: string | undefined }>,
  media_type?: "pelicula" | "serie";
  filters?: GetDiscoverProps;
}

export default async function MediaGrid({ searchParams, media_type = "pelicula", filters }: MediaGridProps) {
  const { page = "1" } = await searchParams

  const { data } = filters
    ? media_type === "pelicula"
      ? await tmdbFetcher.getDiscoverMovie({ page, ...filters })
      : await tmdbFetcher.getDiscoverTV({ page, ...filters })
    : media_type === "pelicula"
      ? await tmdbFetcher.getTrendingMovies({ page })
      : await tmdbFetcher.getTrendingTV({ page })
  // Los resultados de TV son bastantes desconocidos porque son de shows... 

  return (
    <section>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

        {data?.results?.map((media, i) => (
          <Link
            key={`page:${page}-${i}`}
            //  max-w-[185px] max-h-[278px] 
            className="aspect-[2/3] overflow-hidden rounded-lg bg-card"
            href={`/${media_type}/${media.id}`}
          >
            <Suspense>
              <Image
                alt={isMovie(media) ? media.title : media.name}
                className="object-cover size-full"
                width={185}
                height={278}
                quality={75}
                loading="lazy"
                title={isMovie(media) ? media.title : media.name}
                src={
                  media.poster_path
                    ? `https://image.tmdb.org/t/p/w185${media.poster_path}`
                    : "https://placehold.co/185x278?text=No+Image"
                }
              />
            </Suspense>
          </Link>
        ))}

      </div>

      <Suspense>
        <MediaPagination
          page={Number(page)}
          totalPages={Math.min(data?.total_pages ?? 1, 500)}
        />
      </Suspense>
    </section>
  )
}