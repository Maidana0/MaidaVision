'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Command, CommandDialog, CommandInput, CommandList } from 'maidana07/components/ui/command';
import useSearchStore from 'maidana07/store/use-search-store';
import useSearch from 'maidana07/hooks/use-search';
import useHotkey from 'maidana07/hooks/use-hot-key';
import useDialogStore from 'maidana07/store/use-dialog-store';
import SearchResults from './group/search-results';
import SearchHistory from './group/search-history';
import { useShallow } from 'zustand/react/shallow';


export default function CommandDialogSearch() {
  const { searchIsOpen, setSearchIsOpen, openSearchDialog, closeSearchDialog } = useDialogStore(useShallow(state => ({
    searchIsOpen: state.search,
    setSearchIsOpen: state.setIsOpen,
    openSearchDialog: state.openDialog,
    closeSearchDialog: state.closeDialog
  })))
  const { results, loading, message, searchQuery, setSearchQuery, clearQuery } = useSearch();
  const router = useRouter();

  // Atajo de teclado (Ctrl+K)
  useHotkey(() => openSearchDialog('search'));

  const handleSelect = useCallback((item: MultiSearchItem) => {
    useSearchStore.getState().addToHistory({
      title: item.title || item.name,
      year: item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || item.year,
      id: item.id,
      poster_path: item.poster_path,
      media_type: item.media_type,
    });
    closeSearchDialog("search");
    router.push(`/movie/${item.id}`);
  }, [closeSearchDialog, router]);

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
            onSelect={handleSelect}
          />

          {!searchQuery && (<SearchHistory onSelect={handleSelect} />)}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}