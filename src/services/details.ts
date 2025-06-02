import { CustomResponse } from "maidana07/types/fetcher-types";
import { MediaType } from "maidana07/types/TMDB/media/common/common-types";
import fetcher from "maidana07/utils/fetcher";


type DetailsProps = { id: string, mediaType: MediaType }

export async function getMediaDetails<T>({ id, mediaType }: DetailsProps): Promise<CustomResponse<T>> {

  const url = `/api/tmdb/${mediaType}/${id}`

  const data = await fetcher<T>({ url });

  return data;
}