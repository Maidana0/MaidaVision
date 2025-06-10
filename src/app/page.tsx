import { Hero } from "maidana07/components/home/hero"
import { Features } from "maidana07/components/home/features"
import { Testimonials } from "maidana07/components/home/testimonials"
import { CallToAction } from "maidana07/components/home/call-to-action"
import Loader from "maidana07/components/ui/loader"
import dynamic from "next/dynamic"

const TrendingTop = dynamic(() => import("maidana07/components/home/trending-top"), {
  loading: () => <Loader className="py-14" />
})
const TrendingModal = dynamic(() => import("maidana07/components/home/trending-modal"))

export default async function HomePage() {

  return (
    <>
      <Hero />
      <TrendingTop trendingFor="peliculas" />
      <Features />
      <TrendingTop trendingFor="series" />
      <Testimonials />
      <CallToAction />
      <TrendingModal />
    </>
  )
}
