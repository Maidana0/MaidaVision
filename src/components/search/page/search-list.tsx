import { FC } from "react";
import { MediaTypes } from "maidana07/types/TMDB/search";
import dynamic from "next/dynamic";
import { MultiSearchItem } from "maidana07/types/TMDB/media-result";
import tmdbFetcher from "maidana07/lib/api/tmdb";
import { Skeleton } from "maidana07/components/ui/skeleton";

const MediaPagination = dynamic(() => import("maidana07/components/media/pagination/media-pagination"), {
  loading: () => <p className="text-center py-4 my-10 text-xl font-semibold text-muted-foreground">Cargando Paginación...</p>
})
const SearchPageCard = dynamic(() => import("maidana07/components/cards/search-page-card"), {
  loading: () => <Skeleton className="sm:w-[185px] w-11/12 mx-auto min-h-[272px]" />
})

interface SearchListProps {
  type?: MediaTypes;
  q: string;
  page?: number;
}
const SearchList: FC<SearchListProps> = async ({ type, q, page }) => {
  const { data: response } = await tmdbFetcher.multiSearch(q, { type, page });

  if (response == null || !("results" in response) || !(response.results.length)) return (
    <h2 className="text-center py-4 my-10 text-xl font-semibold text-muted-foreground">No se encontraron resultados.</h2>
  );

  return (
    <section className="space-y-4 py-10 min-h-[55dvh] max-w-6xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-0.5 gap-y-3 sm:gap-3">
        {
          response.results.map((media: MultiSearchItem) => (
            <SearchPageCard key={media.id} media={media} type={type} />
          ))
        }
      </div>

      <MediaPagination
        page={response.page}
        totalPages={response.total_pages}
      />


    </section>
  )
}

export default SearchList;