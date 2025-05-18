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
        src={item.poster_url}
        alt={`${item.position}-${item.title}`}
        className={`swiper-lazy w-full h-full object-cover transition-all duration-500 dark:sm:opacity-70 dark:sm:group-hover:opacity-100 hover:scale-105`}
        width={185}
        height={278}
        quality={90}
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

