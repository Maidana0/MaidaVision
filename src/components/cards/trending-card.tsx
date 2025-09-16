"use client"
import useTrendingModalStore from 'maidana07/store/use-trending-modal-store';
import Image from 'next/image'
import { FC } from 'react';


const TrendingCard: FC<{ item: TrendingMedia }> = ({ item }) => {
  const onOpen = useTrendingModalStore(s => s.onOpen)

  return (
    <div
      className='relative group rounded-lg overflow-hidden cursor-pointer'
      onClick={() => onOpen(item)}
      style={{
        width: "185px",
        height: "278px",
        aspectRatio: '2/3'
      }}
    >

      <div className='swiper-lazy-preloader' />

      <Image
        loading={"lazy"}
        // unoptimized={!item.poster_url}
        src={(item.poster_url && item.poster_url != null) ? item.poster_url : "https://placehold.co/185x278?text=No+Image"}
        alt={`${item.position}-${item.title}`}
        className={`swiper-lazy w-full h-full object-cover transition-all duration-500 dark:sm:opacity-70 dark:sm:group-hover:opacity-100 hover:scale-105`}
        width={185}
        height={278}
        quality={100}
        placeholder="blur"
        blurDataURL="/images/image-not-found.png"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement
          target.src = "/images/image-not-found.png"
        }}
        // momentaneo para evitar el error de next/image en Vercel Edge
        unoptimized={true}
      />
      <div className='absolute bottom-0 left-0 right-0 px-2 py-2 w-fit'>
        <span className="font-medium truncate font md:text-5xl text-4xl text-white text-shadow-lg/50 text-shadow-primary" >
          {item.position}
        </span>
      </div>
    </div>
  )
}

export default TrendingCard

