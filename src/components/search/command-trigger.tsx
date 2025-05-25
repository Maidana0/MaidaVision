'use client';

import { Search } from 'lucide-react';
import { Button } from 'maidana07/components/ui/button';
import { CommandShortcut } from 'maidana07/components/ui/command';
import useDialogStore from 'maidana07/store/use-dialog-store';
import { useShallow } from 'zustand/react/shallow';

export default function CommandTrigger() {
  const openDialog = useDialogStore(useShallow(state => state.openDialog))

  return (
    <Button
      variant="outline"
      onClick={() => openDialog("search")}
      className="p-2 text-muted-foreground hover:text-accent-foreground sm:min-w-[200px] min-w-7/12 hover:bg-transparent transition-colors"
    >
      <Search className="w-5 h-5" />
      Buscar
      <CommandShortcut>
        (Ctrl + K)
      </CommandShortcut>
    </Button>
  )
}