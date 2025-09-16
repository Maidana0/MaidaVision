"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card"
import { FC } from "react"



const PersonCard: FC<{
  name: string;
  description: string;
  image?: string | null;
}> = ({ name, image, description }) => {

  return (
    <Card className="w-[140px] min-h-[260px] rounded-lg overflow-hidden gap-1 text-md text-center hover:bg-muted cursor-pointer p-2 justify-evenly">
      <CardContent className="px-0 w-[120px] h-[180px] flex justify-center">
        <Image
          className="object-contain rounded-md"
          src={(image && image != null)
            ? `https://image.tmdb.org/t/p/w154${image}`
            : "/images/person2.png"}
          alt={name}
          height={image != null ? 180 : 96}
          width={image != null ? 120 : 64}
          loading="lazy"
          quality={75}
          placeholder="blur"
          blurDataURL="/images/person2.png"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement
            target.src = "/images/person2.png"
          }}
          // momentaneo para evitar el error de next/image en Vercel Edge
          unoptimized={true}
        />
      </CardContent>
      <CardTitle className="px-1.5 leading-4 font-normal text-wrap w-full">
        {name}
      </CardTitle>


      <CardFooter className="pt-2 px-1.5 justify-center text-muted-foreground leading-4">
        {description}
      </CardFooter>
    </Card>
  )
}

export default PersonCard