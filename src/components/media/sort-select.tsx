"use client"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { SlidersHorizontal } from "lucide-react"


const sortOptions = [
  { value: 'none', label: 'Por defecto' },
  { value: 'popularity.desc', label: 'Más populares' },
  { value: 'vote_average.desc', label: 'Mejor valoradas' },
  { value: 'primary_release_date.desc', label: 'Más recientes' },
  { value: 'revenue.desc', label: 'Más taquilleras' },
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
    <div>

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
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

    </div>
  )
}

export default SortSelect