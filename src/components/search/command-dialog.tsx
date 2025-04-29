'use client';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Command, CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from 'maidana07/components/ui/command';
import useSearchStore from 'maidana07/store/use-search-store';
import useSearch from 'maidana07/hooks/use-search';
import useHotkey from 'maidana07/hooks/use-hot-key';
import { useShallow } from 'zustand/react/shallow';
import useDialogStore from 'maidana07/store/use-dialog-store';
import Loader from '../ui/loader';
import { useCallback } from 'react';
import CustomListItems from './group/custom-list-items';


export default function CommandDialogSearch() {
  // Estados globales
  const { searchIsOpen, setSearchIsOpen, openSearchDialog, closeSearchDialog } = useDialogStore()

  //  Estado de búsqueda global
  const { history, addToHistory, clearHistory } = useSearchStore(
    useShallow(state => ({
      history: state.history,
      addToHistory: state.addToHistory,
      clearHistory: state.clearHistory
    }))
  );
  const { results, loading, error, searchQuery, setSearchQuery } = useSearch();
  const router = useRouter();

  // Atajo de teclado (Ctrl+K) por defecto
  useHotkey(openSearchDialog)

  const handleSelect = useCallback((item: MultiSearchItem) => {
    addToHistory({
      title: item.title || item.name,
      year: item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || item.year,
      id: item.id,
      poster_path: item.poster_path,
      media_type: item.media_type,
    });
    closeSearchDialog();
    router.push(`/movie/${item.id}`);
  }, [addToHistory, closeSearchDialog, router]);

  return (
    <CommandDialog
      open={searchIsOpen}
      onOpenChange={setSearchIsOpen}
      aria-label="Buscador de películas y series"
      dialogContentClassName="lg:max-w-2xl"
    >
      <Command shouldFilter={false} className="overflow-y-auto">
        <CommandInput
          placeholder="Buscar películas o series..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />

        <CommandList className="max-h-[60vh]">
          <AnimatePresence mode="wait" key="search-animation">
            {searchQuery.length > 2 && !loading && results.length === 0 && (
              <CommandEmpty key="empty-results">
                {error || 'No se encontraron resultados.'}
              </CommandEmpty>
            )}

            {/* Historial de búsquedas */}
            {!searchQuery && history.length > 0 && (
              <CustomListItems
                key="history-list"
                heading="Búsquedas recientes"
                nameList="history"
                listItems={history}
                onSelect={handleSelect}
              >
                <CommandItem
                  key="clear-history"
                  className="cursor-pointer opacity-75 w-fit mx-auto mt-2" onSelect={clearHistory}>
                  <Trash2 className="h-4 w-4" /> Limpiar historial
                </CommandItem>
              </CustomListItems>
            )}

            {/* Indicador de carga */}
            {loading && (<Loader key="loader" />)}

            {/* Resultados de búsqueda */}
            {!loading && results.length > 0 && (
              <CustomListItems
                key="search-results"
                heading="Resultados de busqueda"
                nameList="results"
                listItems={results}
                onSelect={handleSelect}
              />
            )}

          </AnimatePresence>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}