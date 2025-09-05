import MovieDetail from 'maidana07/components/media/details/pages/movie-detail';
import tmdbFetcher from 'maidana07/lib/api/tmdb';
import { MovieDetails } from 'maidana07/types/TMDB/media/movie-detail';
import { Metadata } from "next"
import { Suspense } from 'react';


type Props = {
  params: Promise<{ id: string }>
}

export const getMovieDetail = async (id: string): Promise<MovieDetails | { message: string }> => {
  const data = await tmdbFetcher.getMediaDetails<MovieDetails>({
    id,
    mediaType: "movie",
  })
  if (!data.success || !data.data) return { message: data.message || data.serverMessage || "Error desconocido" };
  return data.data
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const mediaID = id.split("-")[0]
  const data = await getMovieDetail(mediaID)
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