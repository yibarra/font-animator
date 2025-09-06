import { create } from 'zustand'
import type { IMainStore } from './interfaces'

export const useMainStore = create<IMainStore>((set) => ({
  isVisible: false,
  isPlaying: false,
  isDragging: false,
  isOpenSelector: false,
  isRotation: false,

  setIsVisible: (visible) => set({ isVisible: visible }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setIsDragging: (dragging) => set({ isDragging: dragging }),
  setIsRotation: (rotation) => set({ isRotation: rotation }),
  setIsOpenSelector: (open) => set({ isOpenSelector: open }),
}))