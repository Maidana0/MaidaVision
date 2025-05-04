import Image from 'next/image'
import { FC } from 'react';


const TrendingCard: FC<{ item: TrendingMedia }> = ({ item }) => {
  return (
    <div className='relative group rounded-lg overflow-hidden'>
      <Image
        loading='lazy'
        src={item.poster_url}
        alt={`${item.position}-${item.id}`.slice(0, 5)}
        className='swiper-lazy w-full h-full object-cover transition-all duration-500 dark:opacity-70 dark:group-hover:opacity-100 hover:scale-105'
        width={189.14}
        height={284.22}
        style={{ viewTransitionName: `trending-card-${item.id}` }}
      />
      <div className='absolute bottom-0 left-0 right-0 px-3 py-2 cursor-default'>
        <span className="font-medium truncate font text-5xl text-white text-shadow-lg/50 text-shadow-primary" >
          {item.position}
        </span>
      </div>
    </div>
  )
}

export default TrendingCard

