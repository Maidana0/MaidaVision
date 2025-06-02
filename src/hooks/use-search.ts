import { useCallback, useEffect, useState, useTransition } from 'react';
import useQueryParamStore from 'maidana07/store/use-query-param-store';
import useCache from './use-cache';
import { search } from 'maidana07/services/search';
import { MultiSearchItem } from 'maidana07/types/TMDB/media-result';

const DEBOUNCE_DELAY = 350;
const MIN_QUERY_LENGTH = 2;

export default function useSearch() {
  const { searchQuery, setSearchQuery, clearQuery } = useQueryParamStore();
  const [results, setResults] = useState<MultiSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { getCached, setCached } = useCache<MultiSearchItem[]>();

  const performSearch = useCallback(async (searchTerm: string) => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    if (normalizedQuery.length < MIN_QUERY_LENGTH) {
      setResults([]);
      return;
    }

    const cachedResults = getCached(normalizedQuery);
    if (cachedResults) {
      startTransition(() => setResults(cachedResults));
      return;
    }

    setLoading(true);
    setMessage(null);

    const response = await search(normalizedQuery)

    if (response.success && response.data) {
      const searchResults = response.data.results || [];
      setCached(normalizedQuery, searchResults);
      startTransition(() => setResults(searchResults));
    }
    setMessage(response.message);
    setLoading(false);
  }, [getCached, setCached]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) performSearch(searchQuery);
      else setResults([]);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  return {
    results,
    loading: loading || isPending,
    message,
    clearQuery,
    searchQuery,
    setSearchQuery
  };
}