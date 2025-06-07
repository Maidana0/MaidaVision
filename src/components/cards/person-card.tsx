"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import { FC } from "react"
import { CreatedBy } from "maidana07/types/TMDB/media/tv-detail"



const PersonCard: FC<{ person: CreatedBy, arrayType: "created-by" | "cast" | "crew" }> = ({ person, arrayType }) => {

  return (
    <Card className="min-w-[120px] min-h-[180px] rounded-lg overflow-hidden gap-1 text-md text-center pb-3">
      <CardContent className="px-0">
        <Image
          className="object-contain w-full h-auto rounded-md"
          src={person.profile_path
            ? `https://image.tmdb.org/t/p/w154${person.profile_path}`
            : `https://placehold.co/120x180?text=${person.name}`}
          alt={person.name}
          height={180}
          width={120}
          loading="lazy"
          quality={75}
        />
      </CardContent>
      <CardTitle className="px-1.5 leading-5 font-normal">
        {person.name}
      </CardTitle>


      <CardFooter className="pt-2 px-1.5 justify-center text-muted-foreground leading-2">
        {
          arrayType === "created-by"
            ? "Creador"
            : ""
        }
      </CardFooter>
    </Card>
  )
}

export default PersonCard