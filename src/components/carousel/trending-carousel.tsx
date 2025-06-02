"use client"

import { Section } from "../ui/section"
import { SwiperSlide } from 'swiper/react';
import { FC } from "react";
import CustomLink from "../ui/custom-link";
import TrendingCard from "../cards/trending-card";
import Carousel from "./carousel";



interface TrendingCarouselProps {
  heading: string;
  href?: string;
  items: TrendingMedia[];
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

      <Carousel>
        {items.map((item, i) => (
          <SwiperSlide key={`${item.id}-${i}`}>
            <TrendingCard item={item} />
          </SwiperSlide>
        ))}
      </Carousel>
    </Section >
  )
}


export default TrendingCarousel