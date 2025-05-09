import { Hero } from "maidana07/components/home/hero"
import { Features } from "maidana07/components/home/features"
import { Testimonials } from "maidana07/components/home/testimonials"
import { CallToAction } from "maidana07/components/home/call-to-action"
import tmdbFetcher from "maidana07/lib/api/tmdb"
import TrendingCarousel from "maidana07/components/carousel/trending-carousel"
import { formatMediaData } from "maidana07/utils/transform/formatMediaData"
import { TrendingModal } from "maidana07/components/home/trending-modal"
import { Suspense } from "react"
import Loader from "maidana07/components/ui/loader"



export default async function HomePage() {
  const { data: dataMovies } = await tmdbFetcher.getTrendingMovies();
  const { data: dataTV } = await tmdbFetcher.getTrendingTV();

  const trendingMovies = dataMovies?.results?.slice(0, 10) ?? [];
  const trendingTV = dataTV?.results?.slice(0, 10) ?? [];

  const formattedTV = formatMediaData(trendingTV)
  const formattedMovies = formatMediaData(trendingMovies)

  return (
    <>
      {/* Background gradient */}
      <div className="absolute inset-0 dark:bg-gradient-to-b from-primary/50 via-background to-background -z-10" />

      <Hero />
      <Suspense fallback={<Loader />}>
        <TrendingCarousel heading="Series" items={formattedTV} href="/series" />
      </Suspense>
      <Features />
      <Suspense fallback={<Loader />}>
        <TrendingCarousel heading="Películas" items={formattedMovies} href="/peliculas" />
      </Suspense>
      <Testimonials />
      <CallToAction />
      <TrendingModal />
    </>
  )
}
