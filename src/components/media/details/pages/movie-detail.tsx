import { getMovieDetail } from 'maidana07/app/(media-detail)/pelicula/[id]/page'
import RecommendationsCarousel from 'maidana07/components/carousel/recommendations-carousel'
import * as details from 'maidana07/components/media/details'


const MovieDetail = async ({ id }: { id: string }) => {

  const data = await getMovieDetail(id)

  if ("message" in data) {
    return (<div className="p-12 w-full max-w-4xl">
      <h1>Ocurrio un error.</h1>
      <p className="bg-card w-2xl mx-auto p-6 mt-6">
        {data.message}
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
    runtime,
    homepage,
    belongs_to_collection,
    'watch/providers': providers,
    production_companies,
    videos,
    recommendations,
    similar,
    credits,
    created_by,
  } = data


  return (
    <>
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
        runtime={runtime}
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

      <details.ProductionInfo companies={production_companies} />

      <details.CollectionBanner belongs_to_collection={belongs_to_collection} />

      <div className='bg-muted pt-16 pb-20 space-y-10'>
        {recommendations?.results.length > 0 && (<RecommendationsCarousel
          type={"movie"}
          items={recommendations.results}
          title={"Podría interesarte"}
        />)
        }

        {similar?.results.length > 0 && <RecommendationsCarousel
          type={"movie"}
          items={similar.results}
          title={"Similares"}
        />
        }
      </div>

    </>
  )
}

export default MovieDetail