import SkeletonMediaGrid from "maidana07/components/media/list/skeleton-media-grid"
import tmdbFetcher from "maidana07/lib/api/tmdb"
import dynamic from "next/dynamic"

const DynamicMediaGrid = dynamic(() => import("maidana07/components/media/list/dynamic-media-grid"), { loading: SkeletonMediaGrid })


const page = () => {
  const initialData = tmdbFetcher.getTrendingTV()

  return (
    <DynamicMediaGrid
      initialData={initialData}
      mediaType={"serie"}
    />
  )
}

export default page