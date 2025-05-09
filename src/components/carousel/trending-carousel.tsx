"use client"

import { Section } from "../ui/section"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/parallax';
import { FC } from "react";
import CustomLink from "../ui/custom-link";
import TrendingCard from "../cards/trending-card";



interface TrendingCarouselProps {
  heading: string;
  href?: string;
  items: TrendingMedia[];
}

const navigation = {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
}
const breakpoints = {
  320: { slidesPerView: 1.7, centeredSlides: true },
  480: { slidesPerView: 2.6, centeredSlides: true },
  560: { slidesPerView: 3 },
  640: { slidesPerView: 3.5 },
  1024: { slidesPerView: 5 },
  1280: { slidesPerView: 6 },
}

const TrendingCarousel: FC<TrendingCarouselProps> = ({ items, href = "#", heading }) => {

  return (
    <Section>
      <div className="flex justify-between items-center sm:pb-7 pb-3  flex-wrap gap-2">
        <h2 className="text-3xl font-bold">
          <span className="text-primary">{heading} </span>
          en tendencia
        </h2>

        <CustomLink href={href} className="ml-auto">
          Ver más
        </CustomLink>

      </div>
      <div className="relative w-full mx-auto">
        <Swiper
          modules={[Parallax, Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          initialSlide={0}
          watchSlidesProgress={true}
          lazyPreloadPrevNext={1}
          parallax={true}
          navigation={navigation}
          className="rounded-xl overflow-visible"
          breakpoints={breakpoints}
        >

          {items.map((item, i) => (
            <SwiperSlide key={`${item.id}-${i}`}>
              <TrendingCard item={item} />
            </SwiperSlide>
          ))}

          <div className="swiper-button-prev !text-white !opacity-60 hover:!opacity-100 absolute top-0 left-0 z-10 w-12 h-full items-center justify-center bg-gradient-to-r from-primary/40 to-transparent cursor-pointer sm:flex hidden">
            <span className="text-xl">&#10094;</span>
          </div>

          <div className="swiper-button-next !text-white !opacity-60 hover:!opacity-100 absolute top-0 right-0 z-10 w-12 h-full sm:flex items-center justify-center bg-gradient-to-l from-primary/40 to-transparent cursor-pointer hidden">
            <span className="text-xl">&#10095;</span>
          </div>
        </Swiper>
      </div>
    </Section >
  )
}


export default TrendingCarousel