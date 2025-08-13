import PersonDetail from "maidana07/components/media/details/person/person-detail"
import tmdbFetcher from "maidana07/lib/api/tmdb"
import { PersonDetails } from "maidana07/types/TMDB/media/person-detail"
import type { Metadata } from 'next'
import { Suspense } from "react"


type Props = {
  params: Promise<{ id: string }>
}

async function getData(id: string): Promise<PersonDetails | null> {
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
  const data = getData(id)

  // const {
  //   name,
  //   biography,
  //   adult,
  //   also_known_as,
  //   birthday,
  //   deathday,
  //   gender,
  //   homepage,
  //   imdb_id,
  //   known_for_department,
  //   place_of_birth,
  //   popularity,
  //   profile_path,
  //   id: iden,
  //   combined_credits,
  //   images
  // } = data

  return (
    <div className="max-w-5xl w-[calc(100%-2rem)] mx-auto space-y-4 my-5">
      <Suspense fallback={<div>Cargando...</div>}>
        <PersonDetail data={data} />
      </Suspense >
    </div >
  )
}

export default page