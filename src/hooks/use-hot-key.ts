"use client"
import { useEffect, useCallback } from 'react';

export default function useHotkey(callback: () => void, keys = ['k']) {
  const down = useCallback((e: KeyboardEvent) => {
    if (
      e.key
      && keys.includes(e.key.toLowerCase())
      && (e.metaKey || e.ctrlKey)
    ) {
      e.preventDefault();
      callback();
    }
  }, [callback, keys]);

  useEffect(() => {
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [down]);
}