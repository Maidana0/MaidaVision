'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/parallax';

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
}

interface TrendingMoviesCarouselProps {
  movies: Movie[];
}
const breakpoints = {
  320: { slidesPerView: 1.75 },
  480: { slidesPerView: 2.75 },
  640: { slidesPerView: 3.75 },
  1024: { slidesPerView: 4.75 },
  1280: { slidesPerView: 5.75 },
}

export default function TrendingMoviesCarousel({ movies }: TrendingMoviesCarouselProps) {

  return (
    <section className="p-4 my-4">
      <h2 className="text-2xl font-bold mb-4">Tendencias</h2>
      <div className="relative w-full mx-auto">
        <Swiper
          modules={[Autoplay, Parallax, Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          parallax={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}

          className="rounded-xl overflow-visible"
          breakpoints={breakpoints}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative group">
                <img
                  data-src={movie.posterUrl}
                  src={movie.posterUrl}
                  className="swiper-lazy w-full h-full object-cover rounded-lg transition-opacity duration-700 opacity-80 group-hover:opacity-100"
                  alt={movie.title}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <h3 className="text-white text-sm font-medium truncate">{movie.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Botón Anterior */}
          <div className="swiper-button-prev !text-white !opacity-60 hover:!opacity-100 absolute top-0 left-0 z-10 w-12 h-full flex items-center justify-center bg-gradient-to-r from-black/40 to-transparent cursor-pointer">
            <span className="text-xl">&#10094;</span>
          </div>

          {/* Botón Siguiente */}
          <div className="swiper-button-next !text-white !opacity-60 hover:!opacity-100 absolute top-0 right-0 z-10 w-12 h-full flex items-center justify-center bg-gradient-to-l from-black/40 to-transparent cursor-pointer">
            <span className="text-xl">&#10095;</span>
          </div>

        </Swiper>
      </div>
    </section>
  );
}
