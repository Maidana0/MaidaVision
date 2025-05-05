"use client"

import { Section } from "../ui/section"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
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
  320: { slidesPerView: 1.75 },
  480: { slidesPerView: 2.75 },
  640: { slidesPerView: 3.75 },
  1024: { slidesPerView: 4.75 },
  1280: { slidesPerView: 5.75 },
}

const TrendingCarousel: FC<TrendingCarouselProps> = ({ items, href = "#", heading }) => (
  <Section className="md:px-5 px-2.5">
    <div className="flex justify-between items-center pb-7">
      <h2 className="text-3xl font-bold">
        <span className="text-primary">{heading} </span>
        en tendencia
      </h2>

      <CustomLink href={href} >
        Ver más
      </CustomLink>

    </div>
    <div className="relative w-full mx-auto">
      <Swiper
        modules={[Autoplay, Parallax, Navigation]}
        spaceBetween={16}
        slidesPerView={4}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
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

        <div className="swiper-button-prev !text-white !opacity-60 hover:!opacity-100 absolute top-0 left-0 z-10 w-12 h-full flex items-center justify-center bg-gradient-to-r from-primary/40 to-transparent cursor-pointer">
          <span className="text-xl">&#10094;</span>
        </div>

        <div className="swiper-button-next !text-white !opacity-60 hover:!opacity-100 absolute top-0 right-0 z-10 w-12 h-full flex items-center justify-center bg-gradient-to-l from-primary/40 to-transparent cursor-pointer">
          <span className="text-xl">&#10095;</span>
        </div>
      </Swiper>
    </div>
  </Section >
)


export default TrendingCarousel