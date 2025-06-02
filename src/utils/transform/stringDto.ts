import { MediaType, TVStatus } from "maidana07/types/TMDB/media/common/common-types";


export function translateMediaTypeToOriginal(mediaType?: string): MediaType | "????" {
  switch (mediaType) {
    case 'pelicula': return 'movie';
    case 'serie': return 'tv';
    case 'persona': return 'person';
    default: return '????'
  }
}

export function translateMediaType(mediaType?: string, plural: boolean = false): string {
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


export function translateStatusMedia(status: TVStatus) {
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