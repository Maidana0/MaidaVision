
import Image from 'next/image'
import { Button } from 'maidana07/components/ui/button'
import { ReactNode, Suspense } from 'react'
import { Skeleton } from 'maidana07/components/ui/skeleton'
import { translateGenres } from 'maidana07/utils/transform/formatMediaData'
import { Badge } from "maidana07/components/ui/badge"
import { ProvidersTypes } from './streaming-availability'
import { StreamingAvailability } from "maidana07/components/media/details"
import { HeartPlusIcon } from 'lucide-react'
import CustomLink from 'maidana07/components/ui/custom-link'
import { minutesToHours } from 'maidana07/utils/transform/numberToString'

interface MediaHeaderProps {
  genres: { id: number; name: string }[]
  backdropPath?: string | null
  posterPath?: string | null
  title: string
  tagline?: string
  trailerButton?: ReactNode
  providers: ProvidersTypes
  homepage?: string | null;
  type: "tv" | "movie";
  runtime?: number;
}

export default function MediaHeader({ genres, backdropPath, posterPath, title, tagline, trailerButton, homepage, providers, type, runtime }: MediaHeaderProps) {
  const genresList = translateGenres({ originalGenresList: genres, type })

  return (
    <div className="relative">
      <div className="relative w-full h-[45dvh] sm:min-h-[375px] min-h-[300px] sm:h-[65dvh]" >
        <Image
          src={
            (backdropPath && backdropPath != null)
              ? `https://image.tmdb.org/t/p/original${backdropPath}`
              : `https://placehold.co/640x480?text=${title}`
          }
          alt={title}
          fill
          className="object-cover brightness-50"
          quality={75}
          priority
        />
      </div>

      <div className={`
          sm:absolute sm:inset-0 flex flex-col 
          sm:flex-row items-center justify-start 
          sm:gap-6 gap-2.5 max-w-5xl w-[calc(100%-2rem)] mx-auto z-10 
        `}
      >
        <div className="text-center z-10 sm:mt-0 mt-[-280px] min-w-[240px] max-h-[360px] relative">
          <Image
            src={
              (posterPath && posterPath != null)
                ? `https://image.tmdb.org/t/p/w500${posterPath}`
                : "https://placehold.co/240x360?text=No+Image"}
            alt={title}
            width={240}
            height={360}
            quality={100}
            priority
            className="rounded-lg"
          />
          {homepage && homepage != null
            ? <CustomLink size="sm" aria-label="homepage" className="bg-muted/40 absolute top-1 left-1 font-normal truncate max-w-[240px] text-xs" href={homepage.toString()} target="_blank">
              Sitio web
            </CustomLink>
            : ""}
        </div>
        <div className="w-full text-center sm:text-left space-y-2 sm:space-y-5" >

          <div className="max-w-2xl flex gap-2 flex-wrap  sm:justify-start justify-center">
            {genresList.map((genre) => (
              <Badge key={genre} variant={"secondary"}>
                {genre}
              </Badge>
            ))}
          </div>

          <div>
            <h1 className="text-4xl font-bold sm:text-white text-foreground">
              {title}
              {runtime && (<span title="Duración" className="ml-2 text-muted-foreground text-sm">
                ({minutesToHours(runtime)})
              </span>)}
            </h1>
            {tagline && (
              <Badge variant={"outline"} className="backdrop-blur-sm text-lg mt-2 text-muted-foreground italic">
                &quot;{tagline}&quot;
              </Badge>
            )}
          </div>

          <div className="mt-4 flex gap-3 justify-center sm:justify-start" >
            {
              trailerButton && <Suspense fallback={<Skeleton className='h-9 w-[96px] bg-primary' />}>{trailerButton}</Suspense>
            }
            < Button variant="outline" title={"Agregar a favoritos"}><HeartPlusIcon className="size-5" /></Button>
          </div>

          <StreamingAvailability providers={providers} />

        </div>

      </div>

    </div >
  )
}
