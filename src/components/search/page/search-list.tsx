"use client"
import { FC, use } from "react";
import MediaPagination from "maidana07/components/media/list/media-pagination"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "maidana07/components/ui/card";
import Image from "next/image";
import CustomLink from "maidana07/components/ui/custom-link";
import { Badge } from "maidana07/components/ui/badge";
import { convertTitleToURL, translateMediaType } from "maidana07/utils/transform/stringDto";
import { MediaTypes } from "maidana07/types/TMDB/search";

interface SearchListProps {
  data: Promise<any>;
  type?: MediaTypes
}
const SearchList: FC<SearchListProps> = ({ data, type }) => {
  const { data: response } = use(data)

  return (
    <section className="space-y-4 py-10 min-h-[100dvh] max-w-6xl mx-auto">

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-0.5 gap-y-3 sm:gap-3">

        {
          response.results.map((media: any, i: number) => (
            <Card
              key={i}
              className="gap-0 pb-2 overflow-hidden w-[185px] mx-auto"
              title={media.title ?? media.name}
            >

              <div className="w-full max-h-[272px] h-auto aspect-[2/3] relative content-center brightness-90 hover:brightness-100 transition">
                {(type == "person" || media.media_type == "person")
                  ? <Image
                    className={"object-contain  max-w-full mx-auto content-center"}
                    src={(media.profile_path && media.profile_path != null)
                      ? `https://image.tmdb.org/t/p/w185${media.profile_path}`
                      : "/images/person2.png"}
                    alt={media.name}
                    height={media.profile_path != null ? 282 : 96}
                    width={media.profile_path != null ? 185 : 64}
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
                    alt={media.title || media.name}
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
                      : (media.release_date || media.first_air_date).slice(0, 4)
                    }
                  </Badge>
                </>
              </div>


              <CardContent className="flex flex-col my-2 gap-1 px-2">
                <CardTitle className="text-sm truncate w-full">
                  {media.title ?? media.name}
                </CardTitle>
                <CardDescription className="text-[0.8rem] text-muted-foreground line-clamp-3">
                  {(type == "person" || media.media_type == "person")
                    ? media.known_for.length >= 1 ? (<>
                      Conocid{media.gender == 1 ? "a" : "o"} por:{" "}
                      {media.known_for.map((kf: any) => kf.title || kf.name).filter(Boolean).join(', ')}
                    </>) : "La información no está disponible."
                    : media.overview?.length > 5 ? media.overview : "La descripción no está disponible."
                  }
                </CardDescription>

              </CardContent>

              <CardFooter className="justify-center mt-auto">
                <CardAction>
                  <CustomLink
                    className="h-[1.6rem] bg-primary/70 text-[0.8rem]"
                    variant={"button"}
                    href={
                      `/${translateMediaType(media.media_type || type, false, true)}/${convertTitleToURL(media.title || media.name, media.id)
                      }`
                    }
                  >
                    Ver más
                  </CustomLink>
                </CardAction>
              </CardFooter>

            </Card>
          ))
        }
      </div>

      <MediaPagination
        page={response.page}
        totalPages={response.total_pages}
      />
    </section>
  )
}

export default SearchList;