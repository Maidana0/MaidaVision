import tmdbFetcher from "maidana07/lib/api/tmdb";
import HeadDetail from "../person/head-detail";
import { Section } from "maidana07/components/ui/section";


const PersonDetail = async ({ id }: { id: string }) => {
  const data = await tmdbFetcher.getPersonDetail(id)

  if ("message" in data) return (<div className="p-12 w-full max-w-4xl">
    <h1>Ocurrio un error.</h1>
    <p className="bg-card w-2xl mx-auto p-6 mt-6 text-muted-foreground">
      {data.message}
    </p>
  </div>)

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
