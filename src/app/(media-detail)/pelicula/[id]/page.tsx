import RecommendationsCarousel from 'maidana07/components/carousel/recommendations-carousel';
import * as details from 'maidana07/components/media/details'
import tmdbFetcher from 'maidana07/lib/api/tmdb';
import { MovieDetails } from 'maidana07/types/TMDB/media/movie-detail';
import { Metadata } from "next"
/* eslint-disable  @typescript-eslint/no-explicit-any */


export const metadata: Metadata = {
  title: "Película"
}

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
  } = data.data


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
        cast={credits.cast as any}
        crew={credits.crew as any}
      />

      <details.ProductionInfo companies={production_companies} />

      <details.CollectionBanner belongs_to_collection={belongs_to_collection} />

      <div className='bg-muted pt-16 pb-20 space-y-10'>
        <RecommendationsCarousel
          type={"tv"}
          items={recommendations.results as any}
          title={"Podría interesarte"}
        />

        {similar.results.length > 0 && <RecommendationsCarousel
          type={"tv"}
          items={similar.results as any}
          title={"Similares"}
        />
        }
      </div>

    </>
  )
}
// espero que los "as any" sean temporales xd
export default page