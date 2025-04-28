import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { useShallow } from 'zustand/react/shallow'
import useQueryParamStore from 'maidana07/store/use-query-param-store';

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: 'movie' | 'tv' | 'person';
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
}

export default function useSearch() {
  // Estado de búsqueda global
  const { searchQuery, setSearchQuery } = useQueryParamStore(
    useShallow(state => ({
      searchQuery: state.searchQuery,
      setSearchQuery: state.setSearchQuery
    })
    ));

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const cache = useRef<Record<string, SearchResult[]>>({});
  const abortController = useRef<AbortController | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout>(null);

  const useSearchQuery = useCallback(async (searchTerm: string) => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    if (normalizedQuery.length < 2) {
      setResults([]);
      return;
    }

    if (cache.current[normalizedQuery]) {
      startTransition(() => {
        setResults(cache.current[normalizedQuery]);
      });
      return;
    }

    if (abortController.current) {
      abortController.current.abort();
    }

    setLoading(true);
    setError(null);

    abortController.current = new AbortController();

    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(normalizedQuery)}`,
        { signal: abortController.current.signal }
      );

      if (!res.ok) throw new Error('Error en la búsqueda');

      const data = await res.json();

      cache.current[normalizedQuery] = data.results || [];

      startTransition(() => {
        setResults(data.results || []);
      });

    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError('Hubo un problema al buscar. Por favor intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (searchQuery) {
        useSearchQuery(searchQuery);
      } else {
        setResults([]);
      }
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery, useSearchQuery]);

  return {
    results,
    loading: loading || isPending,
    error,
    searchQuery,
    setSearchQuery
  };
}