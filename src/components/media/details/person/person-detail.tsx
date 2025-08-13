"use client"
import { PersonDetails } from "maidana07/types/TMDB/media/person-detail";
import { use } from "react"
import HeadDetail from "./head-detail";
import { Section } from "maidana07/components/ui/section";


const PersonDetail = ({ data }: { data: Promise<PersonDetails | null> }) => {


  const useData = use(data)
  if (!useData) return (<div className="p-12 w-full max-w-4xl">
    <h1>Ocurrio un error.</h1>
    <p className="bg-card w-2xl mx-auto p-6 mt-6">
      {JSON.stringify(data)}
    </p>
  </div>)

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
  } = useData

  return (
    <>
      <HeadDetail
        name={name}
        profile_path={profile_path}
        birthday={birthday}
        deathday={deathday}
        place_of_birth={place_of_birth}
        known_for_department={known_for_department}
        gender={gender}
        also_known_as={also_known_as}
        biography={biography}
      />

      <Section>

      </Section>
    </>
  )
}


export default PersonDetail;
