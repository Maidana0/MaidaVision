"use client"
import { BelongToCollectionType } from 'maidana07/types/TMDB/media/movie-detail'
import Image from 'next/image';
import React from 'react'

const CollectionBanner = ({ belongs_to_collection }: { belongs_to_collection?: BelongToCollectionType }) => {
  if (!belongs_to_collection || belongs_to_collection === null) return null;

  const { backdrop_path, id, name, poster_path } = belongs_to_collection
  return (
    <section key={id}
      className="relative aspect-video w-full min-h-[375px]"
      aria-label="Colección de películas a la cúal pertenece"
    >
      {
        backdrop_path != null && (
          <Image
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={name}
            fill
            className='object-cover brightness-75 content-center'
            quality={75}
            placeholder="blur"
            blurDataURL={"https://placehold.co/640x360?text=" + name}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.src = "https://placehold.co/640x360?text=" + name
            }}
            // momentaneo para evitar el error de next/image en Vercel Edge
            unoptimized={true}
          />)
      }

      {poster_path != null && (
        <div className="relative w-full h-full content-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={name}
            width={240}
            height={360}
            className="rounded-lg m-auto"
            quality={75}
            placeholder="blur"
            blurDataURL={"https://placehold.co/240x360?text=" + name.slice(0, 10)}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.src = "https://placehold.co/240x360?text=" + name.slice(0, 10)
            }}
            // momentaneo para evitar el error de next/image en Vercel Edge
            unoptimized={true}
          />
        </div>
      )}
    </section>
  )
}

export default CollectionBanner