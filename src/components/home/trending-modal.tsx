"use client"

import { Button } from "maidana07/components/ui/button"
import { Modal } from "maidana07/components/ui/modal"
import useTrendingModalStore from "maidana07/store/use-trending-modal-store"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FC } from "react"
import Loader from "../ui/loader"
import { Badge } from "../ui/badge"


export const TrendingModal: FC = () => {
  const router = useRouter()
  const { isOpen, onClose, item } = useTrendingModalStore()

  if (!item) return;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Modal de información`}
      description={`Película o serie en tendencia: ${item.title} - En la posición de ${item.position} lugar.`}
      className="max-h-[85vh] !overflow-y-auto"
    >
      <div className="relative aspect-video">
        <Image
          src={item.backdrop_url || item.poster_url}
          alt={item.title}
          fill
          className="object-cover"
          priority
        />
        <Loader className="absolute -z-10 top-2/4 right-2/4 translate-x-[50%] translate-y-[-50%]" size="lg" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        <div className="absolute bottom-1.5 left-5 right-6">
          <h2 className="lg:text-4xl text-3xl font-bold text-white text-shadow-sm truncate pb-0.5">
            {item.title}
          </h2>
        </div>
      </div>

      <div className="px-6 pb-4">

        <div className="flex gap-2 flex-wrap justify-between">
          <div className="space-x-2">
            <Badge variant="ghost" className="md:text-sm">
              {item.release_date}
            </Badge>
            <Badge variant="ghost" className="md:text-sm">
              {item.media_type}
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

        <p className="text-muted-foreground line-clamp-3 md:text-lg text-md mt-4 mb-5">
          {item.overview.length > 5 ? item.overview : "La descripción no está disponible."}
        </p>

        <Button className="block ml-auto" onClick={() => {
          router.push(`/peliculas/${item.id}`)
          onClose()
        }}>
          Ver más
        </Button>

      </div>

    </Modal>
  )
}