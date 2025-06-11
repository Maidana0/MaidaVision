'use client';

import { Command, CommandDialog, CommandInput, CommandList } from 'maidana07/components/ui/command';
import useSearch from 'maidana07/hooks/use-search';
import useHotkey from 'maidana07/hooks/use-hot-key';
import useDialogStore from 'maidana07/store/use-dialog-store';
import SearchResults from './group/search-results';
import SearchHistory from './group/search-history';
import { useShallow } from 'zustand/react/shallow';
import CustomLink from '../ui/custom-link';


export default function CommandDialogSearch() {
  const { searchIsOpen, setSearchIsOpen, openSearchDialog } = useDialogStore(useShallow(state => ({
    searchIsOpen: state.search,
    setSearchIsOpen: state.setIsOpen,
    openSearchDialog: state.openDialog,
  })))
  const { results, loading, message, searchQuery, setSearchQuery, clearQuery } = useSearch();

  // Atajo de teclado (Ctrl+K)
  useHotkey(() => openSearchDialog('search'));

  return (
    <CommandDialog
      open={searchIsOpen}
      onOpenChange={(open) => setSearchIsOpen("search", open)}
      aria-label="Buscador de películas y series"
      dialogContentClassName="lg:max-w-2xl sm:top-[50%] top-[38%]"
      onClose={clearQuery}
      title='Buscador de MaidaVision'
      description='Busca películas y series por su título'
    >
      <Command shouldFilter={false} className="overflow-y-auto">
        <CommandInput
          placeholder="Buscar películas o series..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />

        <CommandList className="max-h-[60vh]">
          <SearchResults
            query={searchQuery}
            results={results}
            loading={loading}
            message={message ?? "Comenzar a buscar"}
          />

          {!loading && searchQuery && results.length > 20 && (
            <div className="after:border-border relative text-center after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t-4 col-span-full my-4">
              <CustomLink href={`/buscar?q=${searchQuery}`} className="bg-card  text-muted-foreground relative z-10 p-3">
                Ver más resultados
              </CustomLink>
            </div>
          )}
          {!searchQuery && (<SearchHistory />)}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}