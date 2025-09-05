import PersonDetail from "maidana07/components/media/details/pages/person-detail"
import { PersonDetailSkeleton } from "maidana07/components/media/details/person/person-detail-skeleton"
import tmdbFetcher from "maidana07/lib/api/tmdb"
import { PersonDetails } from "maidana07/types/TMDB/media/person-detail"
import type { Metadata } from 'next'
import { Suspense } from "react"


type Props = {
  params: Promise<{ id: string }>
}

export async function getPersonDetail(id: string): Promise<PersonDetails | { message: string }> {
  const mediaID = id.split("-")[0]
  const data = await tmdbFetcher.getMediaDetails<PersonDetails>({
    id: mediaID,
    mediaType: "person",
  })

  if (!data.success || !data.data) return { message: data.message || data.serverMessage || "Error desconocido" };
  return data.data
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const data = await getPersonDetail(id)
  if ("message" in data) return { title: "Persona" }

  return {
    title: data.name,
    description: data.biography
  }
}


const PersonDetailPage = async ({ params }: Props) => {
  const { id } = await params

  return (
    <div className="max-w-5xl w-[calc(100%-2rem)] mx-auto space-y-4 my-5">
      <Suspense fallback={<PersonDetailSkeleton />}>
        <PersonDetail id={id} />
      </Suspense >
    </div >
  )
}

export default PersonDetailPage