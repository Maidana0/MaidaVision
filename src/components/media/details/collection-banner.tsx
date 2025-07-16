"use client"
import { BelongToCollectionType } from 'maidana07/types/TMDB/media/movie-detail'
import Image from 'next/image';
import React from 'react'

const CollectionBanner = ({ belongs_to_collection }: { belongs_to_collection?: BelongToCollectionType }) => {
  if (!belongs_to_collection || belongs_to_collection === null) return null;

  const { backdrop_path, id, name, poster_path } = belongs_to_collection
  console.log(backdrop_path, poster_path);

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
      />)
     }

       {poster_path != null && (
          <div className="relative w-full h-full content-center">
              <Image
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={name}
                width={240}
                height={360}
                quality={100}
                className="rounded-lg m-auto"
            />
          </div>
      ) }
    </section>
  )
}

export default CollectionBanner