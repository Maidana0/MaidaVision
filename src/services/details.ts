import { CustomResponse } from "maidana07/types/fetcher-types";
import fetcher from "maidana07/utils/fetcher";


type DetailsProps = { id: string, type: "movie" | "tv" | "person" }

export async function getDetails<T>({ id, type }: DetailsProps): Promise<CustomResponse<T>> {
  const url = `/api/tmdb/${type}/${id}`
  const data = await fetcher<T>({ url });

  return data;
}