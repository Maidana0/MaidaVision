"use client"
import { FC, use, useTransition } from "react";
import MediaPagination from "maidana07/components/media/list/media-pagination"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "maidana07/components/ui/card";
import Image from "next/image";
import CustomLink from "maidana07/components/ui/custom-link";

interface SearchListProps {
  data: Promise<any>;
}
const SearchList: FC<SearchListProps> = ({ data }) => {
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

              <div className="w-full max-h-[272px] h-auto aspect-[2/3]">
                <Image
                  src={
                    (media.poster_path && media.poster_path != null)
                      ? `https://image.tmdb.org/t/p/w200${media.poster_path}`
                      : "https://placehold.co/200x300?text=No+Image"
                  }
                  width={185}
                  height={272}
                  alt={media.title || media.name}
                  className="brightness-95 object-cover max-w-full size-full"
                />
              </div>


              <CardContent className="flex flex-col my-2 gap-1 px-2">
                <CardTitle className="text-sm truncate w-full">
                  {media.title ?? media.name}
                </CardTitle>
                <CardDescription className="text-[0.8rem] text-muted-foreground line-clamp-3">
                  {media.overview?.length > 5 ? media.overview : "La descripción no está disponible."}
                </CardDescription>

              </CardContent>

              <CardFooter className="justify-center mt-auto">
                <CardAction>
                  <CustomLink
                    className="h-6 flex bg-primary/70 text-[0.8rem]"
                    variant={"button"}
                    href={`/media/${media.media_type}/${media.id}`}
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