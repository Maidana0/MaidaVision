import { Hero } from "maidana07/components/home/hero"
import { Features } from "maidana07/components/home/features"
import { Testimonials } from "maidana07/components/home/testimonials"
import { CallToAction } from "maidana07/components/home/call-to-action"
import Loader from "maidana07/components/ui/loader"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import TrendingTop from "maidana07/components/home/trending-top"

const TrendingModal = dynamic(() => import("maidana07/components/home/trending-modal"))

export default async function HomePage() {

  return (
    <>
      <Hero />
      <Suspense fallback={<Loader className="py-14" />}>
        <TrendingTop trendingFor="peliculas" />
      </Suspense>
      <Features />
      <Suspense fallback={<Loader className="py-14" />}>
        <TrendingTop trendingFor="series" />
      </Suspense>
      <Testimonials />
      <CallToAction />
      <TrendingModal />
    </>
  )
}
