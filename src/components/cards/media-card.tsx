import Link from 'next/link'
import { mediaResultIsMovie as isMovie } from "maidana07/utils/transform/formatMediaData"
import Image from 'next/image'
import { convertTitleToURL } from 'maidana07/utils/transform/stringDto'
import { TVResult } from 'maidana07/types/TMDB/media/tv-detail'
import { MovieResult } from 'maidana07/types/TMDB/media/movie-detail'

const MediaCard = ({ media, mediaType, priority, withDescription = false, withScale = false, isForCarousel = false }: {
  media: MovieResult | TVResult,
  mediaType: string,
  priority?: boolean,
  withDescription?: boolean
  withScale?: boolean,
  isForCarousel?: boolean
}) => {
  return (
    <Link
      className="overflow-hidden bg-card relative block group rounded w-[185px] max-h-[272px] h-auto aspect-[2/3] max-w-full"
      href={`/${mediaType}/${convertTitleToURL(
        (isMovie(media) ? media.title : media.name)
        , media.id
      )
        }`}
    >
      {isForCarousel && (<div className='swiper-lazy-preloader' />)}

      <Image
        alt={isMovie(media) ? media.title : media.name}
        className={`object-cover size-full brightness-95 ${withScale && "transition-transform duration-300 hover:scale-[1.04]"}`}
        width={185}
        height={272}
        quality={100}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        title={isMovie(media) ? media.title : media.name}
        src={
          media.poster_path
            ? `https://image.tmdb.org/t/p/w185${media.poster_path}`
            : "https://placehold.co/185x278?text=No+Image"
        }
      />
      {
        withDescription && (
          <div className='flex flex-col justify-between opacity-0 absolute inset-0 w-full h-full hover:opacity-100 bg-card/80 py-4 px-2 transition-opacity '>
            <p className="text-sm line-clamp-5">
              {media.overview && media.overview.length > 5 ? media.overview : "Descripción no disponible."}
            </p>

            <h3 className="font-semibold text-lg truncate" title={(isMovie(media) ? media.title : media.name)}>
              {(isMovie(media) ? media.title : media.name)}
            </h3>
          </div>
        )
      }
    </Link>
  )
}

export default MediaCard