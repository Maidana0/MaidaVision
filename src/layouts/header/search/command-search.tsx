'use client';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'maidana07/components/ui/command';
import { useSearchStore } from 'maidana07/lib/zustand/search/search-store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function CommandSearch() {
  const { open, setOpen, query, setQuery, history, addToHistory } = useSearchStore();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Debounce para optimizar búsquedas
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 1) {
        setLoading(true);
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data) => {
            setSuggestions(
              (data.results || []).filter(
                (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
              )
            );
          })
          .finally(() => setLoading(false));
      } else {
        setSuggestions([]);
      }
    }, 500); // 500ms después de dejar de escribir

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setOpen]);

  const handleSelect = (title: string) => {
    addToHistory(title);
    setOpen(false);
    router.push(`/movie/${encodeURIComponent(title)}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput
          placeholder="Buscar películas o series..."
          value={query}
          onValueChange={setQuery}
        />

        {loading && (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>

          {history.length > 0 && (
            <CommandGroup heading="Historial">
              {history.map((item, index) => (
                <CommandItem key={index} onSelect={() => handleSelect(item)}>
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {suggestions.length > 0 && (
            <CommandGroup heading="Sugerencias">
              {suggestions.map((item: any) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item.title || item.name)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-8 h-12 object-cover mr-2 rounded-md"
                  />
                  {item.title || item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
