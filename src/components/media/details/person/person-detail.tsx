"use client"
import { PersonDetails } from "maidana07/types/TMDB/media/person-detail";
import { use } from "react"
import HeaderDetail from "./header-detail";
import { Section } from "maidana07/components/ui/section";
import { Separator } from "@radix-ui/react-dropdown-menu";


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
      <HeaderDetail
        name={name}
        profile_path={profile_path}
        birthday={birthday}
        deathday={deathday}
        place_of_birth={place_of_birth}
        known_for_department={known_for_department}
        gender={gender}
        also_known_as={also_known_as}
      />

      <Section className="!py-0">
        <h2 className="text-2xl font-bold">Biografía</h2>

        <div className="text-balance p-3 sm:p-5 max-w-4xl">
          {biography.split("\n").map((paragraph, index) => {
            return paragraph != "" && (
              <p className="text-lg leading-7" key={index + "-paragraph"}>
                {paragraph}
                {index != biography.split("\n").length - 1 && <span className="block h-[1px] rounded-2xl bg-muted-foreground/25 my-4.5 w-10/11 mx-auto"></span>}
              </p>
            );
          })}
        </div>
      </Section>

      <Section>

      </Section>
    </>
  )
}


export default PersonDetail;
