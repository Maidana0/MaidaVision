import tmdbFetcher from "maidana07/lib/api/tmdb";
import { formatMediaData } from "maidana07/utils/transform/formatMediaData";
import { Section } from "../ui/section";
import dynamic from "next/dynamic";

const TrendingCarousel = dynamic(() => import("../carousel/trending-carousel"));

const TrendingTop = async ({ trendingFor }: { trendingFor: "peliculas" | "series" }) => {
  const { data, success, message } = trendingFor === "peliculas"
    ? await tmdbFetcher.getTrendingMovies()
    : await tmdbFetcher.getTrendingTV();

  if (!success) {
    return <Section className="bg-muted">
      <p className="text-center flex flex-col gap-2">
        Ocurrió un error al obtener los datos para el carousel de tendencias:
        <span className="text-red-500 font-medium opacity-95"> {message}</span>
      </p>
    </Section>
  }

  const trendingTop = data?.results?.slice(0, 10) ?? [];
  const formattedItems = formatMediaData(trendingTop)

  if (trendingFor === "peliculas") {
    return <TrendingCarousel
      heading={"Peliculas"}
      href={`/${trendingFor}`}
      items={formattedItems}
    />
  }

  else if (trendingFor === "series") {
    return <TrendingCarousel
      heading={"Series"}
      href={`/${trendingFor}`}
      items={formattedItems}
    />
  }
}

export default TrendingTop