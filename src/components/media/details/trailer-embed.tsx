import { Button } from "maidana07/components/ui/button"
import { validateYouTubeVideo } from "maidana07/lib/api/youtube"
import dynamic from "next/dynamic"

const Modal = dynamic(async () => {
  const myModule = await import("maidana07/components/ui/modal")
  return myModule.Modal
})

interface TrailerEmbedProps {
  videos: {
    key: string
    site: string
    type: string
    name: string
    iso_639_1: string
  }[]
}

export default async function TrailerEmbed({ videos }: TrailerEmbedProps) {
  const spanish = videos.find(
    (v) => v.site === "YouTube" && v.type === "Trailer" && v.iso_639_1 === "es"
  )
  const english = videos.find(
    (v) => v.site === "YouTube" && v.type === "Trailer" && v.iso_639_1 === "en"
  )

  let selected = spanish ?? english
  if (!selected) return null

  const isValid = await validateYouTubeVideo(selected.key)

  // Si español no es válido, probar inglés
  if (!isValid && spanish && english) {
    const fallbackValid = await validateYouTubeVideo(english.key)
    if (fallbackValid) selected = english
    else return null
  } else if (!isValid) return null

  return (
    <Modal
      withTrigger
      trigger={<Button>  Ver Trailer   </Button>}
      className="p-0 aspect-video overflow-hidden max-w-[calc(100%-1rem)] border-0 shadow-2xl"
      title={selected.name}
      description={"Trailer desde Youtube"}
      key={selected.key}
    >
      <iframe
        title={selected.name}
        src={`https://www.youtube.com/embed/${selected.key}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      />
    </Modal>
  )
}
