import { create } from 'zustand';


interface DialogState {
  searchIsOpen: boolean;
  setSearchIsOpen: (searchIsOpen: boolean) => void;
  openSearchDialog: () => void;
  closeSearchDialog: () => void;
}

const useDialogStore = create<DialogState>()(
  (set) => ({
    searchIsOpen: false,
    setSearchIsOpen: (searchIsOpen) => set({ searchIsOpen }),
    openSearchDialog: () => set({ searchIsOpen: true }),
    closeSearchDialog: () => set({ searchIsOpen: false })
  })
);

export default useDialogStore;