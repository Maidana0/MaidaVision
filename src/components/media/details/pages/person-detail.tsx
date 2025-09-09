import tmdbFetcher from "maidana07/lib/api/tmdb";
import HeadDetail from "../person/head-detail";
import { Section } from "maidana07/components/ui/section";


const PersonDetail = async ({ id }: { id: string }) => {
  const data = await tmdbFetcher.getPersonDetail(id)

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
    biography,
    // adult,
    also_known_as,
    birthday,
    deathday,
    gender,
    // homepage,
    // imdb_id,
    known_for_department,
    place_of_birth,
    // popularity,
    profile_path,
    // id: iden,
    // combined_credits,
    // images
  } = data

  return (
    <div className="max-w-5xl w-[calc(100%-2rem)] mx-auto space-y-4 my-5">
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
    </div>
  )
}


export default PersonDetail;
