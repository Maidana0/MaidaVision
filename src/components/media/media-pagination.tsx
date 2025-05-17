"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "maidana07/components/ui/pagination"

const MediaPagination = ({ page = 1, totalPages = 1 }: { page?: number; totalPages?: number }) => {

  return (
    <Pagination className="mt-10">
      <PaginationContent className="justify-between w-full">

        <PaginationItem className={page === 1 ? "opacity-0" : ""}>
          <PaginationPrevious href={`?page=${page - 1}`} />
        </PaginationItem>
        <div className="flex gap-2">

          {
            page - 2 > 0 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          {
            Array.from({ length: Math.min(page + 2, totalPages) }).map((_, index) => {
              if (index + 1 < page - 2) return null
              return (
                <PaginationItem key={index}>
                  <PaginationLink href={`?page=${index + 1}`} isActive={page === index + 1}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            })
          }

          {
            page + 2 < totalPages && (
              <PaginationItem>
                <PaginationEllipsis />
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