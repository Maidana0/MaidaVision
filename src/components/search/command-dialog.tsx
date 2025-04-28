'use client';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Trash2 } from 'lucide-react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'maidana07/components/ui/command';
import useSearchStore from 'maidana07/store/use-search-store';
import useSearch from 'maidana07/hooks/use-search';
import useHotkey from 'maidana07/hooks/use-hot-key';
import { useShallow } from 'zustand/react/shallow';
import SearchCard from './search-card';
import useDialogStore from 'maidana07/store/use-dialog-store';


export default function CommandDialogSearch() {
  const { searchIsOpen, setSearchIsOpen, openSearchDialog, closeSearchDialog } = useDialogStore()
  const { history, addToHistory, clearHistory } = useSearchStore(
    useShallow(state => ({
      history: state.history,
      addToHistory: state.addToHistory,
      clearHistory: state.clearHistory
    }),
    )
  );
  const { results, loading, error, searchQuery, setSearchQuery } = useSearch();
  const router = useRouter();

  // Atajo de teclado (Ctrl+K) por defecto
  useHotkey(openSearchDialog)

  const handleSelect = (item: MultiSearchItem) => {

    const itemToAdd = {
      title: item.title || item.name,
      year: item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || item.year,
      id: item.id,
      poster_path: item.poster_path,
      media_type: item.media_type,
    }

    addToHistory(itemToAdd);
    closeSearchDialog();
    router.push(`/movie/${item.id}`);
  };

  return (
    <CommandDialog
      open={searchIsOpen}
      onOpenChange={setSearchIsOpen}
      aria-label="Buscador de películas y series"
    >
      <Command shouldFilter={false} className="overflow-y-auto ">
        <CommandInput
          placeholder="Buscar películas o series..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />

        <CommandList>
          {
            searchQuery.length > 2 && !loading && (<CommandEmpty>
              {error || 'No se encontraron resultados.'}
            </CommandEmpty>)
          }

          <AnimatePresence mode="wait">
            {/* Historial de búsquedas */}
            {!searchQuery && history.length > 0 && (
              <CommandGroup heading="Búsquedas recientes">
                <AnimatePresence>
                  <div className="grid grid-cols-1 md:grid-cols-2 p-1 gap-1 items-center">
                    {history.map((item, i) => (
                      <SearchCard
                        type={item.media_type}
                        key={`history-${item.id}-${i}`}
                        title={item.title ?? "Desconocido"}
                        year={item.year || item.release_date || item.first_air_date}
                        image={item.poster_path}
                        onClick={() => handleSelect(item)}
                      />
                    ))}
                  </div>
                </AnimatePresence>
                <CommandItem
                  className="cursor-pointer opacity-75"
                  onSelect={clearHistory}
                >
                  <Trash2 className="h-4 w-4" /> Limpiar historial
                  {/* ver como centrarlo editando el commanditem */}
                </CommandItem>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-1 items-center">
                    {results.map((item, i) => (
                      <SearchCard
                        type={item.media_type}
                        key={`results-${item.id}-${i}`}
                        title={item.title || item.name || "Desconocido"}
                        year={item.release_date || item.first_air_date}
                        image={item.poster_path}
                        onClick={() => handleSelect(item)}
                      />
                    ))}
                  </div>
                </AnimatePresence>
              </CommandGroup>
            )}
          </AnimatePresence>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}