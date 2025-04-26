'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'maidana07/components/ui/command';
import { useSearchStore } from 'maidana07/store/use-search-store';
import { useSearch } from 'maidana07/hooks/search/use-search';

export function CommandSearch() {
  const { open, setOpen, history, addToHistory } = useSearchStore();
  const { results, loading, error, query, setQuery } = useSearch();
  const router = useRouter();

  // Atajo de teclado (Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  const handleSelect = (item: any) => {
    addToHistory({
      id: item.id,
      title: item.title || item.name,
      poster_path: item.poster_path,
      media_type: item.media_type,
      year: item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)
    });
    setOpen(false);
    router.push(`/movie/${item.id}`);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      aria-label="Buscador de películas y series"
    >
      <Command shouldFilter={false} className="max-h-[80vh] overflow-y-auto">
        <CommandInput
          placeholder="Buscar películas o series..."
          value={query}
          onValueChange={setQuery}
        />

        <CommandList>
          <CommandEmpty>
            {error || 'No se encontraron resultados.'}
          </CommandEmpty>

          <AnimatePresence mode="wait">
            {/* Historial de búsquedas */}
            {!query && history.length > 0 && (
              <CommandGroup heading="Búsquedas recientes">
                <AnimatePresence>
                  {history.map((item, i) => (
                    <motion.div
                      key={`history-${item.id}-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CommandItem onSelect={() => handleSelect(item)}>
                        <div className="flex items-center gap-3">
                          <img
                            src={item.poster_path
                              ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                              : '/placeholder.png'
                            }
                            alt=""
                            className="w-10 h-14 object-cover rounded"
                            loading="lazy"
                          />
                          <div className="flex flex-col">
                            <h3>{item.title}</h3>
                            <span className="text-sm opacity-75">
                              {item.media_type === 'movie' ? 'Película' : 'Serie'}
                              {" • "}
                              {item.year || 'Desconocido'}
                            </span>
                          </div>
                        </div>
                      </CommandItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CommandGroup>
            )}

            {/* Indicador de carga */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center p-4"
              >
                <Loader2 className="h-6 w-6 animate-spin" />
              </motion.div>
            )}

            {/* Resultados de búsqueda */}
            {!loading && results.length > 0 && (
              <CommandGroup heading="Resultados">
                <AnimatePresence>
                  {results.map((item, i) => (
                    <motion.div
                      key={`search-${item.id}-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CommandItem
                        value={item.title || item.name}
                        onSelect={() => handleSelect(item)}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.poster_path
                              ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                              : '/placeholder.png'
                            }
                            alt=""
                            className="w-10 h-14 object-cover rounded"
                            loading="lazy"
                          />
                          <div className="flex flex-col">
                            <h3>{item.title || item.name}</h3>
                            <span className="text-sm opacity-75">
                              {item.media_type === 'movie' ? 'Película' : 'Serie'}
                              {" • "}
                              {item.release_date?.slice(0, 4) ||
                                item.first_air_date?.slice(0, 4)}
                            </span>
                          </div>
                        </div>
                      </CommandItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CommandGroup>
            )}
          </AnimatePresence>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}