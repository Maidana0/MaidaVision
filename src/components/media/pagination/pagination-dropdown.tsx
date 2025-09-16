import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "maidana07/components/ui/dropdown-menu";
import { PaginationEllipsis } from "maidana07/components/ui/pagination";
import CustomLink from "maidana07/components/ui/custom-link";
import { useState } from "react";

interface PaginationDropdownProps {
  startPage: number;
  endPage: number;
  currentPage: number;
  onPageSelect: (page: number) => string;
}

const PaginationDropdown = ({
  startPage,
  endPage,
  currentPage,
  onPageSelect
}: PaginationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  ).filter(page => page !== currentPage);

  if (pages.length === 0) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <PaginationEllipsis />
        <span className="sr-only">Toggle pagination</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="min-w-fit border-none shadow-2xl max-h-[300px] overflow-y-auto"
      >
        {pages.map((page) => (
          <DropdownMenuItem key={page} className="p-0" onSelect={() => setIsOpen(false)}>
            <CustomLink href={onPageSelect(page)} className="px-4 py-2 w-full">
              {page}
            </CustomLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PaginationDropdown;
