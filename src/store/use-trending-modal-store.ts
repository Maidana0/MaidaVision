import { create } from 'zustand'

interface TrendingModalStore {
  isOpen: boolean
  item: TrendingMedia | null
  onOpen: (item: TrendingMedia) => void
  onClose: () => void
  onOpenChange: (open: boolean) => void;
}

const useTrendingModalStore = create<TrendingModalStore>((set, get) => ({
  isOpen: false,
  item: null,
  onOpen: (item) => {
    if (item.id === get().item?.id) {
      return set({ isOpen: true })
    }
    return set({ isOpen: true, item })
  },
  onClose: () => set({ isOpen: false, item: null }),
  onOpenChange: (open) => set({ isOpen: open })
}))

export default useTrendingModalStore