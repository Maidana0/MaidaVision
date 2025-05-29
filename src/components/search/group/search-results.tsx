import { CommandEmpty } from 'maidana07/components/ui/command';
import { AnimatePresence } from 'framer-motion';
import Loader from 'maidana07/components/ui/loader';
import dynamic from 'next/dynamic';

const CustomListItems = dynamic(() => import('./custom-list-items'), {
  ssr: false,
  loading: () => <Loader />
})

interface SearchResultsProps {
  query: string;
  results: MultiSearchItem[];
  loading: boolean;
  message: string;
}

function SearchResults({ query, results, loading, message }: SearchResultsProps) {
  return (
    <AnimatePresence mode="wait">
      {query.length > 1 && !loading && results.length === 0 && (
        <CommandEmpty key="empty-results">
          {!loading && message.includes("error")
            ? <span className={"text-red-400 font-medium"}> {message} </span>
            : 'No se encontraron resultados.'
          }
        </CommandEmpty>
      )}

      {loading && <Loader key="loader" />}

      {!loading && results.length > 0 && (
        <CustomListItems
          key="search-results"
          heading={message}
          nameList="results"
          listItems={results}
        />
      )}
    </AnimatePresence>
  );
}

export default SearchResults