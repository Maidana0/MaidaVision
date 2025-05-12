import { create } from 'zustand';

export type DialogKey = 'search' | 'filter';

interface DialogState {
  search: boolean;
  filter: boolean;
  setIsOpen: (key: DialogKey, state: boolean) => void;
  openDialog: (key: DialogKey) => void;
  closeDialog: (key: DialogKey) => void;
}

const useDialogStore = create<DialogState>()(
  (set) => ({
    search: false,
    filter: false,
    setIsOpen: (key, state) => set({ [key]: state }),
    openDialog: (key) => set({ [key]: true }),
    closeDialog: (key) => set({ [key]: false })
  })
);

export default useDialogStore;