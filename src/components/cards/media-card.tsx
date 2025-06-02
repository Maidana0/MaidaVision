import Link from 'next/link'
import { mediaResultIsMovie as isMovie } from "maidana07/utils/transform/formatMediaData"
import Image from 'next/image'
import { convertTitleToURL } from 'maidana07/utils/transform/stringDto'
import { TVResult } from 'maidana07/types/TMDB/media/tv-detail'
import { MovieResult } from 'maidana07/types/TMDB/media/movie-detail'

const MediaCard = ({ media, mediaType, priority }: {
  media: MovieResult | TVResult,
  mediaType: string,
  priority?: boolean
}) => {
  return (
    <Link
      className="aspect-[2/3] overflow-hidden rounded-lg bg-card transition-transform hover:scale-105"
      href={`/${mediaType}/${convertTitleToURL(
        (isMovie(media) ? media.title : media.name)
        , media.id
      )
        }`}
    >
      <Image
        alt={isMovie(media) ? media.title : media.name}
        className="object-cover size-full"
        width={185}
        height={278}
        quality={75}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        title={isMovie(media) ? media.title : media.name}
        src={
          media.poster_path
            ? `https://image.tmdb.org/t/p/w185${media.poster_path}`
            : "https://placehold.co/185x278?text=No+Image"
        }
      />
    </Link>
  )
}

export default MediaCard