import { CustomResponse } from "maidana07/types/fetcher-types";
import fetcher from "maidana07/utils/fetcher";

export default async function search(query: string): Promise<CustomResponse<SearchResponse>> {
  const url = `/api/tmdb/search?q=${encodeURIComponent(query)}`

  const data = await fetcher<SearchResponse>({
    url, errorMessage: 'Error al realizar la búsqueda'
  });

  return data;
}