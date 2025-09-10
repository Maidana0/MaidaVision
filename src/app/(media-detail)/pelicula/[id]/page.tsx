import tmdbFetcher from 'maidana07/lib/api/tmdb';
import { Metadata } from "next"
import { Suspense } from 'react';
import MovieDetail from 'maidana07/components/media/details/pages/movie-detail';
import MediaDetailSkeleton from 'maidana07/components/skeletons/media-detail/media-detail-skeleton';
type Props = {
  params: Promise<{ id: string }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const mediaID = id.split("-")[0]
  const data = await tmdbFetcher.getMovieDetail(mediaID)
  if ("message" in data) return { title: "Película" }

  return {
    title: data.title,
    description: data.overview
  }
}

const MovieDetailPage = async ({ params }: Props) => {
  const { id } = await params

  return (
    <>
      <Suspense fallback={<MediaDetailSkeleton />}>
        <MovieDetail id={id} />
      </Suspense>
    </>
  )
}


export default MovieDetailPage