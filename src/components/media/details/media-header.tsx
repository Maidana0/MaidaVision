
import Image from 'next/image'
import { Button } from 'maidana07/components/ui/button'
import { ReactNode, Suspense } from 'react'
import { Skeleton } from 'maidana07/components/ui/skeleton'
import { translateGenres } from 'maidana07/utils/transform/formatMediaData'
import { Badge } from "maidana07/components/ui/badge"
import { ProvidersTypes } from './streaming-availability'
import { StreamingAvailability } from "maidana07/components/media/details"

interface MediaHeaderProps {
  genres: { id: number; name: string }[]
  backdropPath?: string | null
  posterPath?: string | null
  title: string
  tagline?: string
  trailerButton?: ReactNode
  providers: ProvidersTypes
}

export default function MediaHeader({ genres, backdropPath, posterPath, title, tagline, trailerButton, providers }: MediaHeaderProps) {
  const genresList = translateGenres({ originalGenresList: genres, type: "tv" })

  return (
    <div className="relative">
      <div className="relative w-full h-[45dvh] sm:min-h-[375px] min-h-[300px] sm:h-[65dvh]" >
        <Image
          src={backdropPath ? `https://image.tmdb.org/t/p/original${backdropPath}` : `https://placehold.co/640x480?text=${title}`}
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
        <Image
          src={posterPath ? `https://image.tmdb.org/t/p/w300${posterPath}` : "https://placehold.co/240x360?text=No+Image"}
          alt={title}
          width={240}
          height={360}
          quality={100}
          priority
          className="rounded-lg shadow-lg sm:mt-0 mt-[-280px] z-10"
        />
        <div className="w-full text-center sm:text-left space-y-2 sm:space-y-5" >

          <div className="max-w-2xl flex gap-2 flex-wrap  sm:justify-start justify-center">
            {genresList.map((genre) => (
              <Badge key={genre} variant={"secondary"}>
                {genre}
              </Badge>
            ))}
          </div>

          <div>
            <h1 className="text-4xl font-bold sm:text-white text-foreground">{title}</h1>
            {tagline && <p className="text-lg mt-2 text-muted-foreground italic"> "{tagline}" </p>}
          </div>

          <div className="mt-4 flex gap-3 justify-center sm:justify-start" >
            {
              trailerButton && <Suspense fallback={<Skeleton className='h-9 w-[96px] bg-primary' />}>{trailerButton}</Suspense>
            }
            < Button variant="outline" > Agregar a favoritos </Button>
          </div>

          <StreamingAvailability providers={providers} />

        </div>

      </div>

    </div >
  )
}
