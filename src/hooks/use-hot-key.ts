"use client"
import { useEffect } from 'react';

export default function useHotkey(callback: () => void, keys = ['k']) {

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (keys.includes(e.key.toLowerCase()) && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        callback()
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
}