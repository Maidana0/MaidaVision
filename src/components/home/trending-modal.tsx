"use client"

import { Modal } from "maidana07/components/ui/modal"
import useTrendingModalStore from "maidana07/store/use-trending-modal-store"
import Image from "next/image"
import { FC } from "react"
import { Badge } from "../ui/badge"
import CustomLink from "../ui/custom-link"
import { convertTitleToURL } from "maidana07/utils/transform/stringDto"
import { Skeleton } from "../ui/skeleton"


const TrendingModal: FC = () => {
  const { isOpen, onClose, item, onOpenChange } = useTrendingModalStore()
  if (!item) return;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={`Modal de información`}
      description={`Película o serie en tendencia: ${item.title} - En la posición de ${item.position} lugar.`}
      className="p-0 max-h-[85vh] !overflow-y-auto"
    >
      <picture className="relative sm:aspect-video sm:min-h-auto min-h-[240px]">
        <Image
          src={item.backdrop_url || item.poster_url}
          alt={item.title}
          fill
          className="object-cover object-center"
          priority
        />
        <Skeleton className="absolute inset-0 w-full h-full rounded-none -z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        <div className="absolute bottom-1.5 left-5 right-6">
          <h2 className="lg:text-4xl text-3xl font-bold text-white text-shadow-sm pb-0.5 line-clamp-2"
            title={item.title}
          >
            {item.title}
          </h2>
        </div>
      </picture>

      <div className="px-6 pb-4">

        <div className="flex gap-2 flex-wrap justify-between">
          <div className="space-x-2">
            <Badge variant="ghost" className="md:text-sm">
              {item.release_date}
            </Badge>
            <Badge variant="ghost" className="md:text-sm">
              {item.media_type === "pelicula" ? "Película" : "Serie"}
            </Badge>
          </div>

          <div className="space-x-2">
            {item.genres.map((genre) => (
              <Badge key={genre} variant="ghost" className="md:text-sm">
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground sm:line-clamp-3 line-clamp-4 md:text-lg text-md my-5">
          {item.overview.length > 5 ? item.overview : "La descripción no está disponible."}
        </p>

        <CustomLink
          className="block ml-auto w-fit"
          href={`/${item.media_type}/${convertTitleToURL(item.title, item.id)}`}
          variant={"button"}
          onClick={onClose}
        >
          Ver más
        </CustomLink>

      </div>

    </Modal>
  )
}

export default TrendingModal