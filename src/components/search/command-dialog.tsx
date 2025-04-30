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


export default function CommandDialogSearch() {
  const { searchIsOpen, setSearchIsOpen, openSearchDialog, closeSearchDialog } = useDialogStore();
  const { results, loading, error, searchQuery, setSearchQuery, clearQuery } = useSearch();
  const router = useRouter();

  // Atajo de teclado (Ctrl+K)
  useHotkey(openSearchDialog);

  const handleSelect = useCallback((item: MultiSearchItem) => {
    useSearchStore.getState().addToHistory({
      title: item.title || item.name,
      year: item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || item.year,
      id: item.id,
      poster_path: item.poster_path,
      media_type: item.media_type,
    });
    closeSearchDialog();
    router.push(`/movie/${item.id}`);
  }, [closeSearchDialog, router]);

  return (
    <CommandDialog
      open={searchIsOpen}
      onOpenChange={setSearchIsOpen}
      aria-label="Buscador de películas y series"
      dialogContentClassName="lg:max-w-2xl"
      onClose={clearQuery}
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
            error={error}
            onSelect={handleSelect}
          />

          {!searchQuery && (<SearchHistory onSelect={handleSelect} />)}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}