import TVDetail from 'maidana07/components/media/details/pages/tv-detail';
import tmdbFetcher from "maidana07/lib/api/tmdb";
import { TVDetails } from 'maidana07/types/TMDB/media/tv-detail';
import { Metadata } from "next"
import { Suspense } from 'react';

type Props = {
  params: Promise<{ id: string }>
}

export const getTVDetail = async (id: string): Promise<TVDetails | { message: string }> => {
  const data = await tmdbFetcher.getMediaDetails<TVDetails>({
    id,
    mediaType: "tv",
  })
  if (!data.success || !data.data) return { message: data.message || data.serverMessage || "Error desconocido" };
  return data.data
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const mediaID = id.split("-")[0]
  const data = await getTVDetail(mediaID)
  if ("message" in data) return { title: "Serie" }

  return {
    title: data.name,
    description: data.overview
  }
}

const TVDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const mediaID = id.split("-")[0]

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <TVDetail id={mediaID} />
      </Suspense>

    </>
  )
}


export default TVDetailPage