"use client"
import Image from "next/image"
import { CardContent, CardDescription } from "../ui/card"
import { translateMediaType } from "maidana07/utils/transform/stringDto"
import { FC } from "react";

export interface SearchCardProps {
  title: string;
  year?: string;
  image?: string | null;
  type?: "movie" | "tv" | "person";
  known_for_department?: string;
  id: number;
}

const SearchCard: FC<{ item: SearchCardProps }> = ({
  item
}) => {
  const { title,
    id,
    image,
    known_for_department,
    type,
    year } = item


  return (
    <CardContent className="flex items-center gap-3 px-0 w-full">
      <Image
        width={64}
        height={96}
        src={
          (type == "person" && !image)
            ? "/images/person2.png"
            :
            image
              ? `https://image.tmdb.org/t/p/w92${image}`
              : "/images/image-not-found.png"
        }
        alt={title}
        loading="lazy"
        className="w-16 h-24 object-cover rounded"
        sizes="64px"
        quality={75}
        placeholder="blur"
        blurDataURL={type == "person" ? "/images/person2.png" : "/images/image-not-found.png"}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement
          target.src = type == "person" ? "/images/person2.png" : "/images/image-not-found.png"
        }}
        // momentaneo para evitar el error de next/image en Vercel Edge
        unoptimized={true}
      />
      <CardDescription className="flex flex-col gap-0.5">
        <h3 className="max-h-16 text-ellipsis overflow-y-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {title} <span hidden>-{id}-</span>
        </h3>
        <span className="opacity-75 truncate">
          {` 
              ${translateMediaType(type)}
              ${year ? ` • ${year.slice(0, 4)}` : type === "person" ? ` • ${known_for_department}` : ""}
               `.trim()}
        </span>
      </CardDescription>
    </CardContent>)
}

export default SearchCard