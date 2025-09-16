import cn from "maidana07/utils/cn";
import Biography from "./biography";
import PersonalInfo from "./personal-info";


type HeadDetailDetailProps = {
  name: string;
  profile_path: string;
  birthday: Date;
  deathday: Date | null;
  place_of_birth: string;
  known_for_department: string;
  gender: number;
  also_known_as: string[],
  biography: string
}

const HeadDetail = ({ name, profile_path, birthday, deathday, place_of_birth, known_for_department, gender, also_known_as, biography }: HeadDetailDetailProps) => {


  return (
    <section className={cn(
      "flex flex-col sm:flex-row",
      "sm:gap-10 gap-2.5",
      "items-center justify-start",
      "md:px-5 px-2.5 mt-10"
    )}>



      <div className="flex md:flex-row gap-y-6 gap-x-2 flex-col justify-between sm:items-start items-center w-full">

        <PersonalInfo
          also_known_as={also_known_as}
          birthday={birthday}
          deathday={deathday}
          gender={gender}
          known_for_department={known_for_department}
          name={name}
          place_of_birth={place_of_birth}
          profile_path={profile_path}
        />

        < Biography
          biography={biography}
          name={name}
        />

      </div>

    </section>
  )
}


export default HeadDetail