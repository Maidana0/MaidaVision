"use client"

import { Swiper } from 'swiper/react';
import { Navigation, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/parallax';
import { CSSProperties, ReactNode, Suspense } from "react";


const navigation = {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',

}
const breakpoints = {
  320: { slidesPerView: 1.7, slidesPerGroup: 1 },
  480: { slidesPerView: 2.6, slidesPerGroup: 2 },
  560: { slidesPerView: 3, slidesPerGroup: 3 },
  640: { slidesPerView: 3.5, slidesPerGroup: 3 },
  1024: { slidesPerView: 5, slidesPerGroup: 5 },
  1280: { slidesPerView: 6, slidesPerGroup: 6 },
}

const Carousel = ({ children, loop = false }: { children: ReactNode, loop?: boolean }) => {

  return (

    <div className="relative w-full mx-auto">
      <Swiper
        modules={[Parallax, Navigation]}
        loop={loop}
        spaceBetween={16}
        slidesPerView={4}
        initialSlide={0}
        watchSlidesProgress={true}
        lazyPreloadPrevNext={1}
        parallax={true}
        navigation={navigation}
        className={`rounded overflow-visible`}
        breakpoints={breakpoints}
        style={{ '--swiper-theme-color': 'var(--primary' } as CSSProperties}
      >

        <Suspense>
          {children}
        </Suspense>

        <div className="swiper-button-prev !text-white !opacity-60 hover:!opacity-100 absolute top-0 left-0 z-10 w-12 h-full items-center justify-center bg-gradient-to-r from-primary to-transparent cursor-pointer sm:flex hidden">
          <span className="text-2xl">&#10094;</span>
        </div>

        <div className="swiper-button-next !text-white !opacity-60 hover:!opacity-100 absolute top-0 right-0 z-10 w-12 h-full sm:flex items-center justify-center bg-gradient-to-l from-primary to-transparent cursor-pointer hidden">
          <span className="text-2xl">&#10095;</span>
        </div>
      </Swiper>
    </div>
  )
}


export default Carousel