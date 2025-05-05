import { create } from 'zustand'

interface TrendingModalStore {
  isOpen: boolean
  item: TrendingMedia | null
  onOpen: (item: TrendingMedia) => void
  onClose: () => void
}

const useTrendingModalStore = create<TrendingModalStore>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null })
}))

export default useTrendingModalStore