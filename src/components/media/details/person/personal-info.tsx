import { Badge } from "maidana07/components/ui/badge";
import { convertGender, knownForTranslate } from "maidana07/utils/transform/knownForTranslate";
import Image from "next/image"

type PersonalInfoProps = {
  name: string;
  profile_path: string;
  birthday: Date;
  deathday: Date | null;
  place_of_birth: string;
  known_for_department: string;
  gender: number;
  also_known_as: string[],
}

const PersonalInfo = ({ profile_path, birthday, deathday, place_of_birth, known_for_department, gender, also_known_as, name }: PersonalInfoProps) => {
  return (
    <div className="w-[280px] sm:w-full md:w-[280px] flex md:flex-col sm:flex-row flex-col space-y-2 bg-primary/15 dark:bg-primary/60 py-2 px-5 rounded-xl md:justify-start justify-evenly items-start sm:items-center">

      <div className="w-[240px] md:mx-auto h-[360px] rounded-lg overflow-hidden">
        <Image
          src={
            profile_path != null
              ? `https://image.tmdb.org/t/p/w500${profile_path}`
              : "/images/image-not-found.png"
          }
          alt={name}
          width={profile_path != null ? 300 : 225}
          height={profile_path != null ? 450 : 225}
          className="!text-inherit object-contain w-full h-full"
          priority
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold md:hidden block">
          {name}
        </h1>

        <h2 className="text-xl font-semibold">
          Información personal
        </h2>

        <div className="px-2 grid grid-cols-2 gap-y-3 w-fit">
          <p className="text-sm text-foreground/65">Conocido por:
            <Badge variant={"secondary"} className="px-2 py-1 text-md mt-1 ml-0 sm:ml-1 block truncate max-w-full">{knownForTranslate(known_for_department)} </Badge> </p>

          <p className="text-sm text-foreground/65">Genero:
            <Badge variant={"secondary"} className="px-2 py-1 text-md mt-1 ml-0 sm:ml-1 block truncate max-w-full">{convertGender(gender)} </Badge> </p>

          <p className="text-sm text-foreground/65">Nacimiento:
            <Badge variant={"secondary"} className="px-2 py-1 text-md mt-1 ml-0 sm:ml-1 block truncate max-w-full">{new Date(birthday).toLocaleDateString()}
            </Badge> </p>

          {deathday
            ? <p className="text-sm text-foreground/65">Fecha de muerte:
              <Badge variant={"secondary"} className="px-2 py-1 text-md mt-1 ml-0 sm:ml-1 block truncate max-w-full">{new Date(deathday).toLocaleDateString()} - {new Date().getFullYear() - new Date(birthday).getFullYear()} a.</Badge></p>
            : <p className="text-sm text-foreground/65">Edad:
              <Badge variant={"secondary"} className="px-2 py-1 text-md mt-1 ml-0 sm:ml-1 block truncate max-w-full">{new Date().getFullYear() - new Date(birthday).getFullYear()} años </Badge></p>}




          <p className="text-sm text-foreground/65 col-span-2">Lugar de nacimiento:
            <Badge variant={"secondary"} className="px-2 py-1 text-md mt-1 ml-0 sm:ml-1 block truncate max-w-full">{place_of_birth} </Badge> </p>
        </div>

        <div className="px-2 w-full md:block hidden">
          <p className="text-foreground/65 text-sm">También conocido como:</p>
          <ul className="list-disc list-inside grid grid-cols-2 py-2 gap-x-1 justify-between text-xs">
            {also_known_as.map((name, index) => (
              <li key={index} className="text-foreground/80">{name}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}

export default PersonalInfo