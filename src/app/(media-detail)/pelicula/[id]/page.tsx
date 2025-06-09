import RecommendationsCarousel from 'maidana07/components/carousel/recommendations-carousel';
import * as details from 'maidana07/components/media/details'
import tmdbFetcher from 'maidana07/lib/api/tmdb';
import { MovieDetails } from 'maidana07/types/TMDB/media/movie-detail';



const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const mediaID = id.split("-")[0]
  const data = await tmdbFetcher.getMediaDetails<MovieDetails>({
    id: mediaID,
    mediaType: "movie",
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
    title,
    backdrop_path,
    poster_path,
    tagline,
    overview,
    genres,
    release_date,
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
    credits,
    created_by,
    homepage
  } = data.data


  return (
    <>
      {/* FUNCIONAN
      <details.MediaHeader
        genres={genres}
        backdropPath={backdrop_path}
        posterPath={poster_path}
        title={title}
        tagline={tagline}
        trailerButton={<details.TrailerEmbed videos={videos?.results || []} />}
        providers={providers.results['AR'] || {}}
        homepage={homepage}
        type="movie"
      />

      <details.MediaInfo
        dates={{ release_date }}
        voteAverage={vote_average}
        voteCount={vote_count}
        language={original_language}
        status={status}
        overview={overview ?? "No disponible."}
        type="movie"
      /> 


      <details.CreditsSection
        created_by={created_by}
        type="movie"
        cast={credits.cast}
        crew={credits.crew}
      />
      */}






      {/* ME FALTAN ESTOS DOS TIOO */}
      {/* <div className='flex flex-wrap'>
        {last_episode_to_air && <details.EpisodeInfo episode={last_episode_to_air} />}
        {next_episode_to_air && <details.EpisodeInfo episode={next_episode_to_air} isNextEpisode />}
      </div> */}

      {/* <details.SeasonList seasons={seasons} /> */}

      {/* "revenue": 415092958,
"runtime": 119,
"imdb_id": "tt14513804",
"belongs_to_collection": {
"id": 131295,
"name": "Capitán América - Colección",
"poster_path": "/c78ZW1qaO62fLxNbaTGKp6n2PrQ.jpg",
"backdrop_path": "/7kVucUYqz8fZkOmFtA8opDwJFXM.jpg"
},
"budget": 180000000, (PRESUPUESTO) */}


      {/* FUNCIONAN
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
      </div> */}

    </>
  )
}

export default page