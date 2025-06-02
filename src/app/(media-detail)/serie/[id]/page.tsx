import RecommendationsCarousel from 'maidana07/components/carousel/recommendations-carousel';
import {
  MediaHeader,
  MediaInfo,
  EpisodeInfo,
  SeasonList,
  ProductionInfo,
  TrailerEmbed,
} from 'maidana07/components/media/details'
import tmdbFetcher from "maidana07/lib/api/tmdb";
import { TVDetails } from 'maidana07/types/TMDB/media/tv-detail';


const MediaDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const mediaID = id.split("-")[0]
  const data = await tmdbFetcher.getMediaDetails<TVDetails>({
    id: mediaID,
    mediaType: "tv",
  })

  if (!data.success || !data.data) {
    return (<div className="p-12">
      <h1>Ocurrio un error.</h1>
      <p className="bg-card w-2xl mx-auto p-6 mt-6">
        {JSON.stringify(data)}
      </p>
    </div>)
  }

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
    similar
  } = data.data

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
        firstAirDate={first_air_date ?? "Desconocido"}
        lastAirDate={last_air_date}
        voteAverage={vote_average}
        voteCount={vote_count}
        language={original_language}
        status={status}
        overview={overview ?? "No disponible."}
      />

      <section className="px-4 md:px-8 lg:px-16 space-y-8">

        {last_episode_to_air && <EpisodeInfo episode={last_episode_to_air} />}

        <SeasonList seasons={seasons} />

        <ProductionInfo companies={production_companies} />

      </section>

      <div className='bg-muted pt-16 pb-20 space-y-10'>
        <RecommendationsCarousel
          type={"tv"}
          items={recommendations.results}
          title={"Podría interesarte"}
        />

        <RecommendationsCarousel
          type={"tv"}
          items={similar.results}
          title={"Similares"}
        />
      </div>
    </>
  )
}


export default MediaDetailPage