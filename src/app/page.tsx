import { Hero } from "maidana07/components/home/hero"
import { Features } from "maidana07/components/home/features"
import { Testimonials } from "maidana07/components/home/testimonials"
import { CallToAction } from "maidana07/components/home/call-to-action"
import tmdbFetcher from "maidana07/lib/api/tmdb"
import TrendingCarousel from "maidana07/components/carousel/trending-carousel"
import { formatMediaData } from "maidana07/utils/transform/formatMediaData"
import { TrendingModal } from "maidana07/components/home/trending-modal"



export default async function HomePage() {
  const { data: dataMovies } = await tmdbFetcher.getTrendingMovies();
  const { data: dataTV } = await tmdbFetcher.getTrendingTV();

  const trendingMovies = dataMovies?.results?.slice(0, 10) ?? [];
  const trendingTV = dataTV?.results?.slice(0, 10) ?? [];

  const formattedTV = formatMediaData(trendingTV)
  const formattedMovies = formatMediaData(trendingMovies)

  return (
    <>
      <Hero />
      <Features />
      <TrendingCarousel heading="Series" items={formattedTV} href="/series" />
      <TrendingCarousel heading="Películas" items={formattedMovies} href="/peliculas" />
      <Testimonials />
      <CallToAction />
      <TrendingModal />
    </>
  )
}
