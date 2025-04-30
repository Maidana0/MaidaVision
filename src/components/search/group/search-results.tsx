import { CommandEmpty } from 'maidana07/components/ui/command';
import { AnimatePresence } from 'framer-motion';
import Loader from 'maidana07/components/ui/loader';
import dynamic from 'next/dynamic';

const CustomListItems = dynamic(() => import('./custom-list-items'), { ssr: false });

interface SearchResultsProps {
  query: string;
  results: MultiSearchItem[];
  loading: boolean;
  error: string | null;
  onSelect: (item: MultiSearchItem) => void;
}

function SearchResults({ query, results, loading, error, onSelect }: SearchResultsProps) {
  return (
    <AnimatePresence mode="wait">
      {query.length > 1 && !loading && results.length === 0 && (
        <CommandEmpty key="empty-results">
          {error || 'No se encontraron resultados.'}
        </CommandEmpty>
      )}

      {loading && <Loader key="loader" />}

      {!loading && results.length > 0 && (
        <CustomListItems
          key="search-results"
          heading="Resultados de búsqueda"
          nameList="results"
          listItems={results}
          onSelect={onSelect}
        />
      )}
    </AnimatePresence>
  );
}

export default SearchResults