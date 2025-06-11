"use client"
import { SwiperSlide } from 'swiper/react';
import { Section } from "../ui/section"
import Carousel from "./carousel"
import MediaCard from "../cards/media-card"
import { MediaType } from 'maidana07/types/TMDB/media/common/common-types';
import { MediaRecommendation } from 'maidana07/types/TMDB/media/tv-detail';
import { translateMediaType } from 'maidana07/utils/transform/stringDto';

const RecommendationsCarousel = ({ items, type, title }: { items: MediaRecommendation[], type: MediaType, title: string }) => {
  return (
    <Section className="max-w-5xl mx-auto space-y-6 w-[calc(100%-2rem)] !py-0">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>
      <Carousel loop={false}>
        {
          items.map((item) => (
            <SwiperSlide key={item.id}>
              <MediaCard
                mediaType={translateMediaType(type, false, true)}
                media={item}
                priority={false}
                withDescription
                isForCarousel
              />
            </SwiperSlide>
          ))
        }
      </Carousel>
    </Section>
  )
}

export default RecommendationsCarousel