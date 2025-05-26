import { CustomResponse } from "maidana07/types/fetcher-types";
import fetcher from "maidana07/utils/fetcher";

export async function search(query: string): Promise<CustomResponse<SearchResponse>> {
  const url = `/api/tmdb/search?q=${encodeURIComponent(query)}`

  const data = await fetcher<SearchResponse>({
    url, errorMessage: 'Ocurrió un error al realizar la búsqueda', successMessage: "Resultados de búsqueda"
  });

  return data;
}