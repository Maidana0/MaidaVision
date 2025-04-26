import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { useSearchStore } from 'maidana07/store/use-search-store';

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: 'movie' | 'tv';
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
}

export function useSearch() {
  const { query, setQuery } = useSearchStore();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const cache = useRef<Record<string, SearchResult[]>>({});
  const abortController = useRef<AbortController | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout>(null);

  const searchQuery = useCallback(async (searchTerm: string) => {
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
      
      const filteredResults = (data.results || [])
        .filter((item: SearchResult) => 
          item.media_type === 'movie' || item.media_type === 'tv'
        );
      
      cache.current[normalizedQuery] = filteredResults;
      
      startTransition(() => {
        setResults(filteredResults);
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
      if (query) {
        searchQuery(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, searchQuery]);

  return {
    results,
    loading: loading || isPending,
    error,
    query,
    setQuery
  };
}