import { MediaType, MovieStatus, TVStatus } from "maidana07/types/TMDB/media/common/common-types";


export function translateMediaTypeToOriginal(mediaType?: string): MediaType | "????" {
  switch (mediaType) {
    case 'pelicula': return 'movie';
    case 'serie': return 'tv';
    case 'persona': return 'person';
    default: return '????'
  }
}

export function translateMediaType(mediaType?: string, plural: boolean = false, toLink: boolean = false): string {
  if (toLink) {
    switch (mediaType) {
      case 'movie': return "pelicula";
      case 'tv': return "serie";
      case 'person': return "persona";
      default: return 'not-found';
    }
  }
  switch (mediaType) {
    case 'movie': return `Película${plural ? 's' : ''}`;
    case 'tv': return `Serie${plural ? 's' : ''}`;
    case 'person': return `Persona${plural ? 's' : ''}`;
    default: return 'Desconocido';
  }
}

export function convertTitleToURL(title: string, id: number): String {
  const newTitle = title
    .toLowerCase()
    .split(" ")
    .join("-")

  return `${id}-${newTitle}`;
}


export function translateStatusMedia(status: TVStatus | MovieStatus, type: "movie" | "tv" = "tv") {
  if (type === "movie") {
    switch (status) {
      case MovieStatus.Released: return 'Estrenada';
      case MovieStatus.Rumored: return "Rumoreada";
      case MovieStatus.Planned: return "Planeada";
      case MovieStatus["In Production"]: return "En Producción";
      case MovieStatus["Post Production"]: return "Post Producción";
      case MovieStatus.Canceled: return "Cancelada";
      default: return 'Desconocido';
    }
  }

  switch (status) {
    case TVStatus['Returning Series']: return 'En emisión';
    case TVStatus.Planned: return 'Planeada';
    case TVStatus["In Production"]: return 'En producción';
    case TVStatus.Ended: return 'Finalizada';
    case TVStatus.Cancelled: return 'Cancelada';
    case TVStatus.Pilot: return 'Piloto';
    default: return 'Desconocido';
  }
}