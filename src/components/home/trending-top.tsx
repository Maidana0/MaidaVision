import tmdbFetcher from "maidana07/lib/api/tmdb";
import TrendingCarousel from "../carousel/trending-carousel"
import { formatMediaData } from "maidana07/utils/transform/formatMediaData";
import { Section } from "../ui/section";

const TrendingTop = async ({ trendingFor }: { trendingFor: "pelicula" | "serie" }) => {
  const { data, success, message } = trendingFor === "pelicula"
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

  if (trendingFor === "pelicula") {
    return <TrendingCarousel
      heading={"Peliculas"}
      href={`/${trendingFor}`}
      items={formattedItems}
    />
  }

  else if (trendingFor === "serie") {
    return <TrendingCarousel
      heading={"Series"}
      href={`/${trendingFor}`}
      items={formattedItems}
    />
  }
}

export default TrendingTop