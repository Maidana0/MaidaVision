"use client"

import { CommandSearch } from 'maidana07/layouts/header/search/command-search';
import { Button } from 'maidana07/components/ui/button';
import { Search } from 'lucide-react';
import { useSearchStore } from 'maidana07/store/use-search-store';

export default function SearchPage() {
  const setOpen = useSearchStore((state) => state.setOpen);

  const handleOpenSearch = () => {
    setOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold text-center">Buscador Avanzado</h1>
      <Button variant="outline" onClick={handleOpenSearch}>
        <Search className="mr-2 h-4 w-4" />
        Abrir buscador (Ctrl + K)
      </Button>
      <CommandSearch />
    </div>
  );
}