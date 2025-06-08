"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import { FC } from "react"
import { Cast, CreatedBy, Crew } from "maidana07/types/TMDB/media/tv-detail"



const PersonCard: FC<{ person: CreatedBy | Cast | Crew, arrayType: "created_by" | "cast" | "crew" }> = ({ person, arrayType }) => {

  return (
    <Card className="w-[140px] min-h-[260px] rounded-lg overflow-hidden gap-1 text-md text-center hover:bg-muted cursor-pointer p-2 justify-evenly">
      <CardContent className="px-0 w-[120px] h-[180px] flex justify-center">
        <Image
          className="object-contain rounded-md"
          src={(person.profile_path && person.profile_path != null)
            ? `https://image.tmdb.org/t/p/w154${person.profile_path}`
            : "/images/person2.png"} // revisar la imagen de persona buscada not found
          alt={person.name}
          height={person.profile_path != null ? 180 : 126}
          width={person.profile_path != null ? 120 : 84}
          loading="lazy"
          quality={75}
        />
      </CardContent>
      <CardTitle className="px-1.5 leading-4 font-normal text-wrap w-full">
        {person.name}
      </CardTitle>


      <CardFooter className="pt-2 px-1.5 justify-center text-muted-foreground leading-4">
        {// eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          arrayType === "created_by" ? "Creador" : arrayType === "cast" ? <span className="block">{person.roles[0]?.character ?? ""}</span> : <span className="block">{person.jobs[0]?.job ?? ""}</span>
        }
      </CardFooter>
    </Card>
  )
}

export default PersonCard