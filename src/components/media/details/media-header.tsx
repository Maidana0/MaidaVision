
import Image from 'next/image'
import { Button } from 'maidana07/components/ui/button'

interface MediaHeaderProps {
  backdropPath: string
  posterPath: string
  title: string
  tagline?: string
}

export function MediaHeader({ backdropPath, posterPath, title, tagline }: MediaHeaderProps) {
  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-xl mb-8" >
      <Image
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        alt={title}
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-6 text-white p-6 z-10" >
        <Image
          src={`https://image.tmdb.org/t/p/w300${posterPath}`}
          alt={title}
          width={200}
          height={300}
          className="rounded-lg shadow-lg hidden md:block"
        />
        <div className="max-w-2xl text-center md:text-left" >
          <h1 className="text-4xl font-bold" > {title} </h1>
          {tagline && <p className="text-lg mt-2 text-muted-foreground italic" > "{tagline}" </p>}
          <div className="mt-4 flex gap-3 justify-center md:justify-start" >
            <Button variant="default" > Ver tráiler </Button>
            < Button variant="outline" > Agregar a favoritos </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
