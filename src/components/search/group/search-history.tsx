import { CommandItem } from 'maidana07/components/ui/command';
import { Trash2 } from 'lucide-react';
import useSearchStore from 'maidana07/store/use-search-store';
import { useShallow } from 'zustand/react/shallow';
import dynamic from 'next/dynamic';
import Loader from 'maidana07/components/ui/loader';

const CustomListItems = dynamic(() => import('./custom-list-items'), {
  ssr: false,
  loading: () => <Loader />
})

function SearchHistory() {
  const { history, clearHistory } = useSearchStore(
    useShallow(state => ({
      history: state.history,
      clearHistory: state.clearHistory
    }))
  );

  if (history.length === 0) return null;

  return (
    <CustomListItems
      key="history-list"
      heading="Búsquedas recientes"
      nameList="history"
      listItems={history}
    >
      <CommandItem
        key="clear-history"
        className="cursor-pointer opacity-75 w-fit mx-auto mt-2"
        onSelect={clearHistory}
      >
        <Trash2 className="h-4 w-4" /> Limpiar historial
      </CommandItem>
    </CustomListItems>
  );
}
export default SearchHistory;