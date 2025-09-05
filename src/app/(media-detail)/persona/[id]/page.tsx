import PersonDetail from "maidana07/components/media/details/pages/person-detail"
import { PersonDetailSkeleton } from "maidana07/components/media/details/person/person-detail-skeleton"
import tmdbFetcher from "maidana07/lib/api/tmdb"
import type { Metadata } from 'next'
import { Suspense } from "react"


type Props = {
  params: Promise<{ id: string }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const data = await tmdbFetcher.getPersonDetail(id)
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