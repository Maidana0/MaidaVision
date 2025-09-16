import { Skeleton } from "maidana07/components/ui/skeleton";

const PersonDetailSkeleton = () => {
  return (
    <div className="max-w-5xl w-[calc(100%-2rem)] mx-auto space-y-4 my-5">

      <section className="flex flex-col sm:flex-row sm:gap-10 gap-2.5 items-center justify-start md:px-5 px-2.5 mt-10">
        <div className="flex md:flex-row gap-y-6 gap-x-2 flex-col justify-between sm:items-start items-center w-full">

          {/* Personal Info Skeleton */}
          <div className="w-[280px] sm:w-full md:w-[280px] flex md:flex-col sm:flex-row flex-col space-y-2 bg-primary/15 dark:bg-primary/60 py-2 px-5 rounded-xl md:justify-start justify-evenly items-start sm:items-center">

            {/* Imagen */}
            <Skeleton className="w-[240px] h-[360px] rounded-lg" />

            {/* Texto + Badges */}
            <div className="space-y-2 w-full">
              <Skeleton className="h-9 w-40 md:hidden block" /> {/* Nombre (mobile) */}
              <Skeleton className="h-6 w-48" /> {/* "Información personal" */}

              {/* Grid info */}
              <div className="px-2 grid grid-cols-2 gap-y-3 w-fit">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex flex-col">
                    <Skeleton className="h-4 w-24 mb-1" /> {/* label */}
                    <Skeleton className="h-6 w-28 rounded-md" /> {/* badge */}
                  </div>
                ))}
              </div>

              {/* Lista de "También conocido como" */}
              <div className="px-2 w-full md:block hidden">
                <Skeleton className="h-4 w-40 mb-2" />
                <ul className="list-disc list-inside grid grid-cols-2 py-2 gap-x-1 justify-between">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>
                      <Skeleton className="h-3 w-24" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Biography Skeleton */}
          <div className="md:max-w-8/12 w-full max-w-full space-y-2">
            <Skeleton className="h-9 w-64 md:block hidden" /> {/* Nombre desktop */}

            <div className="text-balance px-5 py-3 max-w-4xl space-y-3">
              <Skeleton className="h-6 w-32" /> {/* "Biografía" */}
              <div className="space-y-6">
                {
                  Array.from({ length: 2 }).map((_, i) => (
                    <div key={"contain-" + i} className="space-y-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-5 w-full" />
                      ))}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default PersonDetailSkeleton