import { Skeleton } from "maidana07/components/ui/skeleton";
import { Section } from "maidana07/components/ui/section";
import { Suspense } from "react";
import MediaHeaderSkeleton from "./media-header-skeleton";

export const MediaDetailSkeleton = () => {
  return (
    <>
      {/* MediaHeader Skeleton */}
      <MediaHeaderSkeleton />

      {/* CreditsSection Skeleton */}
      <Section className="relative flex flex-col gap-6 !pt-6 !pb-0 max-w-5xl w-[calc(100%-2rem)] mx-auto min-h-[60dvh]">

        {/* Tabs skeleton */}
        <div className="flex space-x-1 mb-6 p-1 rounded-md bg-muted w-fit">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className={`h-11 w-[5.5rem] rounded-md ${i === 0 && "bg-background"} flex items-center align-middle justify-center`}>
              {/* <Skeleton className="bg-foreground/35 h-4 w-16" /> */}
            </Skeleton>
          ))}
        </div>

        {/* Credits grid skeleton */}
        <div className="flex flex-wrap gap-x-3 gap-y-8 w-full mx-auto max-w-[900px] md:justify-start justify-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card items-center align-middle justify-evenly w-[140px] h-[260px] rounded-lg gap-1 p-2 flex flex-col">
              <Skeleton className="w-[120px] h-[180px] rounded-md" /> {/* Profile image */}
              <Skeleton className="h-4 w-10/12" /> {/* Name */}
              <Skeleton className="h-4 w-10/12" /> {/* Character/Job */}
            </div>
          ))}
        </div>

        <div className="mx-auto w-32 bg-muted/40 border border-muted h-9 rounded-md" />
      </Section>

      {/* ProductionInfo Skeleton */}
      <Suspense>
        <Section className="space-y-6 !py-10 max-w-5xl w-[calc(100%-2rem)] mx-auto">
          <Skeleton className="h-6 w-24" /> {/* "Producción" title */}

          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-[100px] h-[100px] rounded-full" />
            ))}
          </div>
        </Section>
      </Suspense>
    </>
  )
}

export default MediaDetailSkeleton