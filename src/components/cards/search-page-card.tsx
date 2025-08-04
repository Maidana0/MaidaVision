import { Card, CardAction, CardContent, CardDescription, CardFooter, CardTitle } from "maidana07/components/ui/card";
import Image from "next/image";
import CustomLink from "maidana07/components/ui/custom-link";
import { Badge } from "maidana07/components/ui/badge";
import { convertTitleToURL, translateMediaType } from "maidana07/utils/transform/stringDto";
import { MediaTypes } from "maidana07/types/TMDB/search";
import { MovieResult } from "maidana07/types/TMDB/media/movie-detail";
import { TVResult } from "maidana07/types/TMDB/media/tv-detail";
import { FC } from "react";
import { MultiSearchItem } from "maidana07/types/TMDB/media-result";

interface SearchPageCardProps {
  media: MultiSearchItem,
  type?: MediaTypes
}

const SearchPageCard: FC<SearchPageCardProps> = ({ media, type }) => {
  const profile_path = (media.profile_path && media.profile_path != null) ? media.profile_path : false
  const title = (media.name ?? media.title) || "Desconocido"

  return (
    <Card
      className="gap-0 pb-2 overflow-hidden sm:w-[185px] w-11/12 mx-auto"
      title={title}
    >

      <div className="w-full max-h-[272px] h-auto aspect-[2/3] relative content-center brightness-90 hover:brightness-100 transition">
        {(type == "person" || media.media_type == "person")
          ? <Image
            className={"object-contain max-w-full mx-auto content-center"}
            src={(profile_path)
              ? `https://image.tmdb.org/t/p/w185${profile_path}`
              : "/images/person2.png"}
            alt={title}
            height={profile_path ? 282 : 96}
            width={profile_path ? 185 : 64}
            loading="lazy"
            quality={75}
          />
          : <Image
            src={
              (media.poster_path && media.poster_path != null)
                ? `https://image.tmdb.org/t/p/w200${media.poster_path}`
                : "/images/image-not-found.png"
            }
            width={185}
            height={272}
            loading="lazy"
            quality={75}
            alt={title}
            className="object-cover max-w-full size-full content-center"
          />
        }
        <>
          <Badge className="absolute right-1 top-1 px-1.5 text-[0.67rem]" variant={"secondary"}>
            {translateMediaType(media.media_type || type)}
          </Badge>
          <Badge className="absolute right-1 bottom-1 px-1.5 text-[0.67rem]" variant={"secondary"}>
            {(type == "person" || media.media_type == "person")
              ? (media.known_for_department)
              : (
                media.release_date?.slice(0, 4) ||
                (media.first_air_date && media.first_air_date !== "" ? media.first_air_date.slice(0, 4) : "N/D")
              )
            }
          </Badge>
        </>
      </div>


      <CardContent className="flex flex-col my-2 gap-1 px-2">
        <CardTitle className="text-sm truncate w-full">
          {title}
        </CardTitle>
        <CardDescription className="text-[0.8rem] text-muted-foreground line-clamp-3">
          {"known_for" in media && media.known_for
            ? media.known_for.length >= 1 ? (<>
              Conocid{media.gender == 1 ? "a" : "o"} por:{" "}
              {
                media.known_for
                  .map((kf: MovieResult | TVResult) => {
                    if ("title" in kf) return kf.title;
                    return kf.name
                  })
                  .filter(Boolean).join(', ')
              }
            </>) : "La información no está disponible."
            : (media.overview?.length ?? 0) > 5 ? media.overview : "La descripción no está disponible."
          }
        </CardDescription>

      </CardContent>

      <CardFooter className="justify-center mt-auto">
        <CardAction>
          <CustomLink
            className="bg-primary/70 text-[0.8rem] h-auto py-1"
            variant={"button"}
            href={
              `/${translateMediaType(media.media_type || type, false, true)}/${convertTitleToURL(title, media.id ?? 0)
              }`
            }
          >
            Ver más
          </CustomLink>
        </CardAction>
      </CardFooter>

    </Card>
  )
}

export default SearchPageCard