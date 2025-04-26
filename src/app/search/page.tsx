'use client'

import { 
  CommandDialog, 
  CommandInput, 
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem 
} from "maidana07/components/ui/command"
import { CommandTrigger } from "maidana07/layouts/header/search/command-trigger"
import { useSearchStore } from "maidana07/lib/zustand/search/search-store"
import { useSearchTMDB } from "maidana07/hooks/search/use-search-tmdb"
import { useState } from "react"

export default function SearchContainer() {
  const isOpen = useSearchStore((s) => s.isOpen)
  const close = useSearchStore((s) => s.close)
  const [query, setQuery] = useState("")
  
  const { results, loading, search } = useSearchTMDB()

  const handleSearch = (value: string) => {
    setQuery(value)
    search(value)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Búsqueda</h1>
      
      <CommandTrigger />

      <CommandDialog open={isOpen} onOpenChange={close}>
        <CommandInput 
          placeholder="Buscar películas y series..." 
          value={query}
          onValueChange={setQuery}
          onKeyDown={(e) => { 
            if (e.key === "Enter") {
              handleSearch(query)
            }
          }
          }
        />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          
          {loading ? (
            <CommandGroup heading="Cargando...">
              <CommandItem>Buscando...</CommandItem>
            </CommandGroup>
          ) : (
            <CommandGroup heading="Resultados">
              {results?.map((item) => (
                <CommandItem key={item.id}>
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  )
}