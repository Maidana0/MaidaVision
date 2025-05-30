// import tmdbFetcher from "maidana07/lib/api/tmdb";
// import { translateMediaTypeToOriginal } from "maidana07/utils/transform/stringDto";
import { redirect } from "next/navigation";
import { FC } from "react"

interface MediaDetailsPageProps {
  params: Promise<{ media_type: "pelicula" | "serie", id: string }>
}

const page: FC<MediaDetailsPageProps> = async ({ params }) => {
  const { media_type, id } = await params;

  if (media_type != "pelicula" && media_type != "serie" && media_type != "persona") {
    redirect(`/pagina-no-encontrada/error/parametro?busqueda=${media_type}-${id}`)
  }

  const mediaID = id.split("-")[0]
  // const data = await tmdbFetcher.getMediaDetails({
  //   id: mediaID,
  //   mediaType: translateMediaTypeToOriginal(media_type),
  // })

  return (
    <>    </>
  )
}

export default page