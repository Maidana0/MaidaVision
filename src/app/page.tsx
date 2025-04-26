import { Hero } from "maidana07/components/home/hero"
import { Features } from "maidana07/components/home/features"
// import TrendingMovies from "maidana07/components/home/trending-movies"
import { Testimonials } from "maidana07/components/home/testimonials"
import { CallToAction } from "maidana07/components/home/call-to-action"
import TrendingMoviesCarousel from "maidana07/components/home/trending-movies-carousel"

export default function HomePage() {
  const mockMovies = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: `Peli ${i + 1}`,
    posterUrl: "https://placehold.co/240x360?text=Movie+" + (i + 1),
  }))

  return (
    <>
      <Hero />
      <Features />
      {/* <TrendingMovies /> */}
      <TrendingMoviesCarousel movies={mockMovies} />
      <Testimonials />
      <CallToAction />
    </>
  )
}
