import MovieDetail from 'maidana07/components/media/details/pages/movie-detail';
import tmdbFetcher from 'maidana07/lib/api/tmdb';
import { Metadata } from "next"
import { Suspense } from 'react';


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
  const mediaID = id.split("-")[0]

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MovieDetail id={mediaID} />
      </Suspense>
    </>
  )
}

export default MovieDetailPage