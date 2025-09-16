import { Section } from "maidana07/components/ui/section"
import { Skeleton } from "maidana07/components/ui/skeleton"


const MediaHeaderSkeleton = () => {
  return (<>
    <div className="relative">
      {/* Background image skeleton */}
      <div className="relative w-full h-[45dvh] sm:min-h-[375px] min-h-[300px] sm:h-[65dvh] bg-muted/50" />


      {/* Content over image */}
      <div className="sm:absolute sm:inset-0 flex flex-col sm:flex-row items-center justify-start sm:gap-6 gap-2.5 max-w-5xl w-[calc(100%-2rem)] mx-auto z-10">

        {/* Poster skeleton */}
        <div className="text-center z-10 sm:mt-0 mt-[-280px] min-w-[240px] max-h-[360px] relative">
          <Skeleton className="w-[240px] h-[360px] rounded-lg" />
        </div>

        {/* Title and info skeleton */}
        <div className="w-full text-center sm:text-left space-y-2 sm:space-y-5">

          {/* Genres skeleton */}
          <div className="max-w-2xl flex gap-2 flex-wrap sm:justify-start justify-center">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-14 rounded-full" />
            ))}
          </div>

          {/* Title skeleton */}
          <Skeleton className="h-10 w-48 mb-2" />

          {/* Buttons skeleton */}
          <div className="mt-4 flex gap-3 justify-center sm:justify-start">
            <Skeleton className="h-9 w-[96px] bg-primary/80" /> {/* Trailer button */}
            <Skeleton className="h-9 w-9" /> {/* Favorite button */}
          </div>

          {/* Streaming availability skeleton */}
          <div className="space-y-4 sm:px-0 px-2.5 flex gap-x-12 gap-y-4 flex-wrap">
            <div className="text-left">
              <Skeleton className="h-6 w-32 mb-3" /> {/* Section title */}
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="w-9 h-9 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* MediaInfo Skeleton */}
    <Section className="flex flex-col-reverse md:flex-col gap-6 !py-6 max-w-5xl w-[calc(100%-2rem)] mx-auto">

      {/* Info cards skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg shadow-md p-5">
            <Skeleton className="h-5 w-20 mb-2" /> {/* Title */}
            <Skeleton className="h-4 w-24" /> {/* Content */}
          </div>
        ))}
      </div>

      {/* Description skeleton */}
      <div>
        <Skeleton className="h-6 w-28 mb-4" /> {/* "Descripción" title */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>
    </Section>
  </>)
}
export default MediaHeaderSkeleton