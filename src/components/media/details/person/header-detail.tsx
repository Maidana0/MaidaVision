import { Badge } from "maidana07/components/ui/badge";
import cn from "maidana07/utils/cn";
import { knownForTranslate, convertGender } from "maidana07/utils/transform/knownForTranslate";
import Image from "next/image";


type HeaderDetailProps = {
  name: string;
  profile_path: string;
  birthday: Date;
  deathday: Date | null;
  place_of_birth: string;
  known_for_department: string;
  gender: number;
  also_known_as: string[]
}

const HeaderDetail = ({ name, profile_path, birthday, deathday, place_of_birth, known_for_department, gender, also_known_as }: HeaderDetailProps) => {


  return (
    <header className={cn(
      "flex flex-col sm:flex-row",
      "sm:gap-10 gap-2.5",
      "items-center justify-start",
      "md:p-10 py-5 px-2.5"
    )}>

      <div className="min-w-[240px] h-[360px] ">
        <Image
          src={
            profile_path != null
              ? `https://image.tmdb.org/t/p/w500${profile_path}`
              : "/images/image-not-found.png"
          }
          alt={name}
          width={profile_path != null ? 300 : 225}
          height={profile_path != null ? 450 : 225}
          className="rounded-lg !text-inherit object-contain w-full h-full"
          priority
        />
      </div>

      <div className="flex justify-center flex-col space-y-5 sm:w-fit w-full">

        <h1 className="text-4xl font-bold sm:text-left text-center">
          {name}
        </h1>

        <h2 className="text-2xl font-bold">Información personal</h2>

        <div className="md:px-5 px-2 grid grid-cols-2 gap-x-1 gap-y-3 sm:gap-5 sm:w-fit w-full">
          <p className="text-sm text-foreground/65">Conocido por:
            <Badge variant={"secondary"} className="px-2.5 py-1 text-md mt-1 ml-0 sm:ml-3.5 block truncate max-w-full">{knownForTranslate(known_for_department)} </Badge> </p>

          <p className="text-sm text-foreground/65">Genero:
            <Badge variant={"secondary"} className="px-2.5 py-1 text-md mt-1 ml-0 sm:ml-3.5 block truncate max-w-full">{convertGender(gender)} </Badge> </p>

          <p className="text-sm text-foreground/65">Fecha de nacimiento:
            <Badge variant={"secondary"} className="px-2.5 py-1 text-md mt-1 ml-0 sm:ml-3.5 block truncate max-w-full">{new Date(birthday).toLocaleDateString()}  </Badge> </p>

          {deathday && <p>Fecha de muerte:
            <Badge variant={"secondary"} className="px-2.5 py-1 text-md mt-1 ml-0 sm:ml-3.5 block truncate max-w-full">{new Date(deathday).toLocaleDateString()} </Badge></p>}

          <p className="text-sm text-foreground/65">Lugar de nacimiento:
            <Badge variant={"secondary"} className="px-2.5 py-1 text-md mt-1 ml-0 sm:ml-3.5 block truncate max-w-full">{place_of_birth} </Badge> </p>
        </div>

        <div className="px-5 text-sm w-fit md:block hidden">
          <p className="text-foreground/65">También conocido como:</p>
          <ul className="list-disc list-inside grid grid-cols-3 px-5 py-2 gap-x-5">
            {also_known_as.map((name, index) => (
              <li key={index} className="text-foreground/80">{name}</li>
            ))}
          </ul>
        </div>

      </div>

    </header >
  )
}


export default HeaderDetail