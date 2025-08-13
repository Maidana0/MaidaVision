import { Gender } from "maidana07/types/TMDB/media/tv-detail"



export function knownForTranslate(knownFor: string) {
  switch (knownFor) {
    case "Acting":
      return "Actuación"
    case "Directing":
      return "Dirección"
    case "Writing":
      return "Escritura"
    case "Production":
      return "Producción"
    default:
      return knownFor
  }
}


export function convertGender(gender: Gender) {
  switch (gender) {
    case Gender.Female:
      return "Femenino"
    case Gender.Male:
      return "Masculino"
    case Gender["Non-binary"]:
      return "No binario"
    default:
      return "No especificado"
  }
}