import RecommendationsCarousel from 'maidana07/components/carousel/recommendations-carousel';
import * as details from 'maidana07/components/media/details'
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
    next_episode_to_air,
    seasons,
    production_companies,
    videos,
    recommendations,
    similar,
    aggregate_credits,
    created_by,
    homepage
  } = data.data

  return (
    <>

      <details.MediaHeader
        genres={genres}
        backdropPath={backdrop_path}
        posterPath={poster_path}
        title={name}
        tagline={tagline}
        trailerButton={<details.TrailerEmbed videos={videos?.results || []} />}
        providers={providers.results['AR'] || {}}
        homepage={homepage}
      />

      <details.MediaInfo
        firstAirDate={first_air_date ?? "Desconocido"}
        lastAirDate={last_air_date}
        voteAverage={vote_average}
        voteCount={vote_count}
        language={original_language}
        status={status}
        overview={overview ?? "No disponible."}
      />

      <details.CreditsSection
        created_by={created_by}
        cast={aggregate_credits.cast}
        crew={aggregate_credits.crew}
      />


      <div className='flex flex-wrap'>
        {last_episode_to_air && <details.EpisodeInfo episode={last_episode_to_air} />}
        {next_episode_to_air && <details.EpisodeInfo episode={next_episode_to_air} isNextEpisode />}
      </div>

      <details.SeasonList seasons={seasons} />

      <details.ProductionInfo companies={production_companies} />

      <div className='bg-muted pt-16 pb-20 space-y-10'>
        <RecommendationsCarousel
          type={"tv"}
          items={recommendations.results}
          title={"Podría interesarte"}
        />

        {similar.results.length > 0 && <RecommendationsCarousel
          type={"tv"}
          items={similar.results}
          title={"Similares"}
        />
        }
      </div>

    </>
  )
}


export default MediaDetailPage