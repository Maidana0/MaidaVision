import tmdbFetcher from "maidana07/lib/api/tmdb"
import { PersonDetails } from "maidana07/types/TMDB/media/person-detail"
import type { Metadata } from 'next'


type Props = {
  params: Promise<{ id: string }>
}

async function getData(id: string) {
  const mediaID = id.split("-")[0]
  const data = await tmdbFetcher.getMediaDetails<PersonDetails>({
    id: mediaID,
    mediaType: "person",
  })

  if (!data.success || !data.data) return null;
  return data.data
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const data = await getData(id)
  if (!data) return { title: "Persona" }

  return {
    title: data.name,
    description: data.biography
  }
}


const page = async ({ params }: Props) => {
  const { id } = await params
  const data = await getData(id)

  if (!data) {
    return (<div className="p-12 w-full max-w-4xl">
      <h1>Ocurrio un error.</h1>
      <p className="bg-card w-2xl mx-auto p-6 mt-6">
        {JSON.stringify(data)}
      </p>
    </div>)
  }

  const {
    name,
    biography,
    adult,
    also_known_as,
    birthday,
    deathday,
    gender,
    homepage,
    imdb_id,
    known_for_department,
    place_of_birth,
    popularity,
    profile_path,
    id: iden,
    combined_credits,
    images
  } = data

  return (
    <>

    </>
  )
}

export default page