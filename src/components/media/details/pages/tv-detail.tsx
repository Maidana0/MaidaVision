import * as details from 'maidana07/components/media/details'
import tmdbFetcher from 'maidana07/lib/api/tmdb'
import dynamic from 'next/dynamic';

const RecommendationsCarousel = dynamic(() => import('maidana07/components/carousel/recommendations-carousel'),
  { loading: () => <div className="h-48" /> }
);

const TVDetail = async ({ id }: { id: string }) => {
  const data = await tmdbFetcher.getTVDetail(id)

  if ("message" in data) {
    return (<div className="p-12 max-w-[calc(100%-2rem)] w-4xl mx-auto">
      <h1 className="text-xl font-semibold">Ocurrio un error</h1>
      <p className="bg-card p-6 mt-6 text-red-700">
        {data.message}
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
    first_air_date: firstAirDate,
    last_air_date: lastAirDate,
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
  } = data



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
        type="tv"
      />

      <details.MediaInfo
        dates={{ firstAirDate, lastAirDate }}
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
        {recommendations?.results.length > 0 && (<RecommendationsCarousel
          type={"tv"}
          items={recommendations.results}
          title={"Podría interesarte"}
        />)
        }

        {similar?.results.length > 0 && (<RecommendationsCarousel
          type={"tv"}
          items={similar.results}
          title={"Similares"}
        />)
        }
      </div>

    </>
  )
}

export default TVDetail