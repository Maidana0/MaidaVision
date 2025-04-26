import { useEffect } from 'react';

export function useHotkey(callback: () => void, keys = ['k'], modifier = 'ctrlKey') {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e && keys.includes(e.key.toLowerCase())) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [callback, keys, modifier]);
}
