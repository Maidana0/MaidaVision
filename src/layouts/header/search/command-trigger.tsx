'use client';

import { Search } from 'lucide-react';
import { Button } from 'maidana07/components/ui/button';
import { useSearchStore } from 'maidana07/lib/zustand/search/search-store';

export function CommandTrigger() {
  const setOpen = useSearchStore((s) => s.setOpen);
  const open = () => {
    setOpen(true)
  }
  return (
    <Button
      variant="ghost"
      onClick={open}
      className="p-2 text-muted-foreground hover:text-foreground"
    >
      <Search className="w-5 h-5" />
    </Button>
  );
}
