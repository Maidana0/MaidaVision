

export function translateMediaTypeToOriginal(mediaType?: string): MediaType {
  switch (mediaType) {
    case 'pelicula': return 'movie';
    case 'serie': return 'tv';
    case 'persona': return 'person';
    default: return 'unknown';
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