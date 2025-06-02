"use client"
import { SwiperSlide } from 'swiper/react';
import { Section } from "../ui/section"
import Carousel from "./carousel"
import MediaCard from "../cards/media-card"

const RecommendationsCarousel = ({ items, type }: { items: MediaRecommendation[], type: MediaType }) => {
  return (
    <div className='bg-muted pb-10'>
      <Section className="space-y-6  max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold">Recomendaciones</h3>
        <Carousel loop={true} rounded={false}>
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