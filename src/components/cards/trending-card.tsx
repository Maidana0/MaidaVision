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
        maxWidth: "221.59px",
        maxHeight: "322.39px",
        aspectRatio: '2/3'
      }}
    >
      <div className="animate-pulse bg-muted rounded-lg w-[201.59px] h-[302.59px]"></div>
      <Image
        loading='lazy'
        src={item.poster_url}
        alt={`${item.position}-${item.id}`.slice(0, 5)}
        className='swiper-lazy w-full h-full object-cover transition-all duration-500 dark:opacity-70 dark:group-hover:opacity-100 hover:scale-105 absolute inset-0'
        width={201.59}
        height={302.59}
        quality={75}
      // style={{ viewTransitionName: `trending-card-${item.id}` }} CREO QUE SOLO FUNCIONA EN LOS LINKS
      />
      <div className='absolute bottom-0 left-0 right-0 px-3 py-2 w-fit'>
        <span className="font-medium truncate font text-5xl text-white text-shadow-lg/50 text-shadow-primary" >
          {item.position}
        </span>
      </div>
    </div>
  )
}

export default TrendingCard

