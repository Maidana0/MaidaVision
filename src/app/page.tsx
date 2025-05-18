import { Hero } from "maidana07/components/home/hero"
import { Features } from "maidana07/components/home/features"
import { Testimonials } from "maidana07/components/home/testimonials"
import { CallToAction } from "maidana07/components/home/call-to-action"
import { TrendingModal } from "maidana07/components/home/trending-modal"
import { Suspense } from "react"
import Loader from "maidana07/components/ui/loader"
import TrendingTop from "maidana07/components/home/trending-top"


export default async function HomePage() {

  return (
    <>
      <Hero />
      <Suspense fallback={<Loader className="py-14" />}>
        <TrendingTop trendingFor="pelicula" />
      </Suspense>
      <Features />
      <Suspense fallback={<Loader className="py-14" />}>
        <TrendingTop trendingFor="serie" />
      </Suspense>
      <Testimonials />
      <CallToAction />
      <Suspense>
        <TrendingModal />
      </Suspense>
    </>
  )
}
