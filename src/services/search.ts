import { CustomResponse } from "maidana07/types/fetcher-types";
import { SearchResponse } from "maidana07/types/TMDB/media-result";
import { SearchProps } from "maidana07/types/TMDB/search";
import fetcher from "maidana07/utils/fetcher";

export async function search(query: string, { type = "multi", page = 1 }: SearchProps = {}): Promise<CustomResponse<SearchResponse>> {
  const url = `/api/tmdb/search?q=${encodeURIComponent(query)}&type=${type}&page=${page}`;

  const data = await fetcher<SearchResponse>({
    url, errorMessage: 'Ocurrió un error al realizar la búsqueda', successMessage: "Resultados de búsqueda"
  });

  return data;
}