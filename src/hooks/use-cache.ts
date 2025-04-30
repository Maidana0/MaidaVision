import { useCallback, useRef } from 'react';

interface CacheOptions {
  maxSize?: number;
  expirationTime?: number;
}

export default function useCache<T>(options: CacheOptions = {}) {
  const {
    maxSize = 100,
    expirationTime = 1000 * 60 * 10 // 10 minutos por defecto
  } = options;

  const cache = useRef<Map<string, { data: T; timestamp: number }>>(new Map());

  const getCached = useCallback((key: string) => {
    const item = cache.current.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > expirationTime;
    if (isExpired) {
      cache.current.delete(key);
      return null;
    }

    return item.data;
  }, [expirationTime]);

  const setCached = useCallback((key: string, data: T) => {
    cache.current.set(key, {
      data,
      timestamp: Date.now()
    });

    // Limpiar caché si excede el tamaño máximo
    if (cache.current.size > maxSize) {
      const entries = Array.from(cache.current.entries());
      const sorted = entries.sort(([, a], [, b]) => a.timestamp - b.timestamp);
      cache.current = new Map(sorted.slice(-Math.floor(maxSize / 2)));
    }
  }, [maxSize]);

  const clearCache = useCallback(() => {
    cache.current.clear();
  }, []);

  return { getCached, setCached, clearCache };
}