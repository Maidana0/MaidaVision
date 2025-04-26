'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'maidana07/components/ui/command';
import { useSearchStore } from 'maidana07/lib/zustand/search/search-store';
import { useSearchTMDB } from 'maidana07/hooks/search/use-search-tmdb';
import { useHotkey } from 'maidana07/hooks/search/use-hot-key';
import { useEffect, useState } from 'react';

export default function SearchCommandPalette() {
  const { open, setOpen, addToHistory, history } = useSearchStore();
  const [input, setInput] = useState('');
  const { search, results, loading } = useSearchTMDB();
  const close = () => setOpen(!open);
  useHotkey(() => setOpen(true));

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (input) search(input);
    }, 300);
    return () => clearTimeout(timeout);
  }, [input]);

  const handleSelect = (title: string) => {
    addToHistory(title);
    close();
    // Redirigir a la película si se desea
  };

  return (
    <CommandDialog open={open} onOpenChange={close}>
      <CommandInput
        placeholder="Buscar películas..."
        value={input}
        onValueChange={setInput}
        autoFocus
      />
      <CommandList>
        {input === '' && (
          <CommandGroup heading="Historial">
            {history.map((item) => (
              <CommandItem key={item} onSelect={() => handleSelect(item)}>
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {input && (
          <>
            {loading && <CommandEmpty>Cargando...</CommandEmpty>}
            {!loading && results.length === 0 && <CommandEmpty>Sin resultados</CommandEmpty>}
            <CommandGroup heading="Resultados">
              {results.map((movie) => (
                <CommandItem key={movie.id} onSelect={() => handleSelect(movie.title)}>
                  {movie.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
