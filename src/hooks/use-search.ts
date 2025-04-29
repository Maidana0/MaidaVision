import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { useShallow } from 'zustand/react/shallow';
import useQueryParamStore from 'maidana07/store/use-query-param-store';

export default function useSearch() {
  // Estado global de búsqueda
  const { searchQuery, setSearchQuery } = useQueryParamStore(
    useShallow(state => ({
      searchQuery: state.searchQuery,
      setSearchQuery: state.setSearchQuery
    }))
  );

  // Estados locales
  const [results, setResults] = useState<MultiSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Referencias persistentes
  const cache = useRef<Map<string, MultiSearchItem[]>>(new Map());
  const abortController = useRef<AbortController | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(async (searchTerm: string) => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    if (normalizedQuery.length < 2) {
      setResults([]);
      return;
    }

    // Verificar caché
    if (cache.current.has(normalizedQuery)) {
      startTransition(() => {
        setResults(cache.current.get(normalizedQuery) || []);
      });
      return;
    }

    // Cancelar petición anterior
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

      const data: SearchResponse = await res.json();
      const searchResults = data.results || [];

      // Actualizar caché
      cache.current.set(normalizedQuery, searchResults);

      startTransition(() => {
        setResults(searchResults);
      });
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError('Hubo un problema al buscar. Por favor intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto para manejar la búsqueda con debounce
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else {
        setResults([]);
      }
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [searchQuery, performSearch]);

  return {
    results,
    loading: loading || isPending,
    error,
    searchQuery,
    setSearchQuery,
    performSearch
  };
}