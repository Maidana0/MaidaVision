'use client';

import { Search } from 'lucide-react';
import { Button } from 'maidana07/components/ui/button';
import { CommandShortcut } from 'maidana07/components/ui/command';
import useSearchStore from 'maidana07/store/use-search-store';
import { useShallow } from 'zustand/react/shallow'

export default function CommandTrigger() {
  const openDialog = useSearchStore(useShallow(state => state.openDialog))

  return (
    <Button variant="outline" onClick={openDialog} className="p-2 text-muted-foreground hover:text-foreground">
      <Search className="w-5 h-5" />
      Buscar
      <CommandShortcut>
        (Ctrl + K)
      </CommandShortcut>
    </Button>
  )
}