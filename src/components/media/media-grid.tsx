import Image from "next/image"
import tmdbFetcher from "maidana07/lib/api/tmdb"
import MediaPagination from "./media-pagination"

export default async function MediaGrid({ page = "1" }: { page?: string }) {
  const { data } = await tmdbFetcher.getDiscoverMovies({ page })

  return (
    <section>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

        {data?.results?.map((movie, i) => (
          <div
            key={`page:${page}-${i}`}
            //  max-w-[185px] max-h-[278px] 
            className="aspect-[2/3] overflow-hidden rounded-lg bg-card"
          >
            <Image
              alt={movie.title}
              className="object-cover size-full"
              width={185}
              height={278}
              quality={75}
              loading="lazy"
              title={movie.title}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                  : "https://placehold.co/185x278?text=No+Image"
              }
            />
          </div>
        ))}

      </div>

      <MediaPagination
        page={Number(page)}
        totalPages={Math.min(data?.total_pages ?? 1, 500)}
      />
    </section>
  )
}