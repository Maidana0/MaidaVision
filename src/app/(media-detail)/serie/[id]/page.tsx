import { Metadata } from "next"
import tmdbFetcher from 'maidana07/lib/api/tmdb'
import { Suspense } from "react"
import TVDetail from "maidana07/components/media/details/pages/tv-detail"
import MediaDetailSkeleton from "maidana07/components/skeletons/media-detail/media-detail-skeleton"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const mediaID = id.split("-")[0]
  const data = await tmdbFetcher.getTVDetail(mediaID)
  if ("message" in data) return { title: "Serie" }

  return {
    title: data.name,
    description: data.overview
  }
}

const TVDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <>
      <Suspense fallback={<MediaDetailSkeleton />}>
        <TVDetail id={id} />
      </Suspense>
    </>
  )
}

export default TVDetailPage