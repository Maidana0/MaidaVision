"use client"
import { SwiperSlide } from 'swiper/react';
import { Section } from "../ui/section"
import Carousel from "./carousel"
import MediaCard from "../cards/media-card"
import { MediaType } from 'maidana07/types/TMDB/media/common/common-types';
import { MediaRecommendation } from 'maidana07/types/TMDB/media/tv-detail';
import { translateMediaType } from 'maidana07/utils/transform/stringDto';

const RecommendationsCarousel = ({ items, type }: { items: MediaRecommendation[], type: MediaType }) => {
  return (
    <div className='bg-muted pb-10'>
      <Section className="max-w-5xl mx-auto space-y-6 w-[calc(100%-2rem)]">
        <h3 className="text-xl font-semibold">{translateMediaType(type, true)} que podrían interesarte</h3>
        <Carousel loop={false} rounded={false}>
          {
            items.map((item) => (
              <SwiperSlide key={item.id}>
                <MediaCard
                  mediaType={type}
                  media={item}
                  priority={false}
                />
              </SwiperSlide>
            ))
          }
        </Carousel>
      </Section>
    </div>
  )
}

export default RecommendationsCarousel