"use client"
import { FC, Suspense, use } from "react";
import MediaPagination from "maidana07/components/media/list/media-pagination"
import { MediaTypes } from "maidana07/types/TMDB/search";
import SearchPageCard from "maidana07/components/cards/search-page-card";

interface SearchListProps {
  data: Promise<any>;
  type?: MediaTypes
}
const SearchList: FC<SearchListProps> = ({ data, type }) => {
  const { data: response } = use(data)

  return (
    <section className="space-y-4 py-10 min-h-[55dvh] max-w-6xl mx-auto">
      {response.results?.length
        ? <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-0.5 gap-y-3 sm:gap-3">
            <Suspense>
              {
                response.results.map((media: any) => (
                  <SearchPageCard key={media.id} media={media} type={type} />
                ))
              }
            </Suspense>
          </div>

          <MediaPagination
            page={response.page}
            totalPages={response.total_pages}
          />
        </>
        : <h2 className="text-center py-4 my-10 text-xl font-semibold text-muted-foreground">No se encontraron resultados.</h2>
      }

    </section>
  )
}

export default SearchList;