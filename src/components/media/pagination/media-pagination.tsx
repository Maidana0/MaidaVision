
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "maidana07/components/ui/pagination"
import { useSearchParams } from "next/navigation";
import PaginationDropdown from "./pagination-dropdown";

const MediaPagination = ({ page = 1, totalPages = 1 }: { page?: number; totalPages?: number }) => {
  const searchParams = useSearchParams();

  const handleParams = (page: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return (`?${params.toString()}`);
  };

  return (
    <Pagination className="mt-10">
      <PaginationContent className="justify-between w-full">

        <PaginationItem className={page === 1 ? "opacity-0" : ""}>
          <PaginationPrevious href={handleParams(page - 1)} />
        </PaginationItem>
        <div className="flex gap-2">

          {
            page - 2 > 0 && (
              <PaginationItem>
                <PaginationDropdown
                  startPage={1}
                  endPage={page - 2}
                  currentPage={page}
                  onPageSelect={handleParams}
                />
              </PaginationItem>
            )
          }

          {
            Array.from({ length: Math.min(page + 2, totalPages) }).map((_, index) => {
              if (index + 1 < page - 2) return null
              return (
                <PaginationItem key={index} className={
                  ((index + 1 > page + 1) || (index + 1 < page - 1))
                    ? "hidden sm:block"
                    : ""
                }>
                  <PaginationLink href={handleParams(index + 1)} isActive={page === index + 1}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            })
          }

          {
            page + 2 < totalPages && (
              <PaginationItem>
                <PaginationDropdown
                  startPage={page + 3}
                  endPage={totalPages}
                  currentPage={page}
                  onPageSelect={handleParams}
                />
              </PaginationItem>
            )
          }
        </div>


        <PaginationItem className={page === totalPages ? "opacity-0" : ""}>
          <PaginationNext href={`?page=${page + 1}`} />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}

export default MediaPagination