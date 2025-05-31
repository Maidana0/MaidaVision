import tmdbFetcher from "maidana07/lib/api/tmdb";
import { translateMediaTypeToOriginal } from "maidana07/utils/transform/stringDto";
import { redirect } from "next/navigation";
import { FC } from "react"
import {
  MediaHeader,
  MediaInfo,
  StreamingAvailability,
  EpisodeInfo,
  SeasonList,
  ProductionInfo,
  TrailerEmbed,
} from 'maidana07/components/media/details'


interface MediaDetailsPageProps {
  params: Promise<{ media_type: "pelicula" | "serie", id: string }>
}

const MediaDetailPage: FC<MediaDetailsPageProps> = async ({ params }) => {
  const { media_type, id } = await params;

  if (media_type != "pelicula" && media_type != "serie" && media_type != "persona") {
    redirect(`/pagina-no-encontrada/error/parametro?busqueda=${media_type}-${id}`)
  }

  const mediaID = id.split("-")[0]
  const { data } = await tmdbFetcher.getMediaDetails({
    id: mediaID,
    mediaType: translateMediaTypeToOriginal(media_type),
  })

  const {
    name,
    backdrop_path,
    poster_path,
    tagline,
    overview,
    genres,
    first_air_date,
    last_air_date,
    vote_average,
    vote_count,
    original_language,
    status,
    'watch/providers': providers,
    last_episode_to_air,
    seasons,
    production_companies,
    videos,
    recommendations,
  } = data as any

  return (
    <>
      <MediaHeader
        genres={genres}
        backdropPath={backdrop_path}
        posterPath={poster_path}
        title={name}
        tagline={tagline}
        trailerButton={<TrailerEmbed videos={videos?.results || []} />}
        providers={providers.results['AR'] || {}}
      />

      <MediaInfo
        firstAirDate={first_air_date}
        lastAirDate={last_air_date}
        voteAverage={vote_average}
        voteCount={vote_count}
        language={original_language}
        status={status}
        overview={overview}
      />

      <section className="px-4 md:px-8 lg:px-16 space-y-8">

        {last_episode_to_air && <EpisodeInfo episode={last_episode_to_air} />}

        <SeasonList seasons={seasons} />

        <ProductionInfo companies={production_companies} />

        {/* <Recommendations items={recommendations?.results || []} /> */}
      </section>
    </>
  )
}


export default MediaDetailPage