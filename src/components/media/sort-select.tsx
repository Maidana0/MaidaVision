"use client"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { SlidersHorizontal } from "lucide-react"


const sortOptions = [
  { value: 'none', label: 'Por defecto' },
  { value: 'title.desc', label: 'Por título (A-Z)' },
  { value: 'title.asc', label: 'Por título (Z-A)' },
  { value: 'popularity.desc', label: 'Más populares' },
  { value: 'popularity.asc', label: 'Menos populares' },
  { value: 'primary_release_date.desc', label: 'Más recientes' },
  { value: 'primary_release_date.asc', label: 'Más antiguas' },
  { value: 'vote_average.desc', label: 'Mejor valoradas' },
  { value: 'vote_average.asc', label: 'Peor valoradas' },
  { value: 'revenue.desc', label: 'Más taquilleras' },
  { value: 'revenue.asc', label: 'Menos taquilleras' },
]


const SortSelect = () => {

  const [filters, setFilters] = useState<any>({
    genre: [],
    year: [],
    rating: '',
    language: 'es',
    sortBy: 'popularity.desc'
  })

  return (
    <Select
    // value={filters.sortBy}
    // onValueChange={(value) => setFilters((prev: any) => ({ ...prev, sortBy: value }))}
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
          {sortOptions.map((option, i) => (
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