"use client"
import { useSortBy } from "maidana07/hooks/use-filters"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { SlidersHorizontal } from "lucide-react"
import { SortBy } from "maidana07/types/TMDB/tmdb-fetcher"
import { useState } from "react"

const sortOptions: { value: SortBy; label: string }[] = [
  { value: SortBy.POPULARITY_DESC, label: 'Más populares' },
  { value: SortBy.POPULARITY_ASC, label: 'Menos populares' },
  { value: SortBy.PRIMARY_RELEASE_DATE_DESC, label: 'Más recientes' },
  { value: SortBy.PRIMARY_RELEASE_DATE_ASC, label: 'Más antiguas' },
  { value: SortBy.VOTE_AVERAGE_DESC, label: 'Mejor valoradas' },
  { value: SortBy.VOTE_AVERAGE_ASC, label: 'Peor valoradas' },
  { value: SortBy.REVENUE_DESC, label: 'Más taquilleras' },
  { value: SortBy.REVENUE_ASC, label: 'Menos taquilleras' },
  { value: SortBy.TITLE_ASC, label: 'Por título (A-Z)' },
  { value: SortBy.TITLE_DESC, label: 'Por título (Z-A)' },
]

const SortSelect = () => {
  const [isChanging, setIsChanging] = useState(false);
  const { sortBy, setSortBy } = useSortBy();

  return (
    <Select
      disabled={isChanging}
      value={sortBy}
      onValueChange={(value: SortBy) => {
        setIsChanging(true);
        setSortBy(value);
        setTimeout(() => setIsChanging(false), 650);
      }}
    >
      <SelectTrigger className="gap-2" isButtonGhost>
        <SlidersHorizontal className="h-4 w-4" />
        <SelectValue placeholder="Ordenar" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            Ordenar por
          </SelectLabel>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SortSelect