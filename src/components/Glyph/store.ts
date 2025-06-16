import { create } from 'zustand'

import type { IGlyphState } from './interfaces'

export const useGlyphStore = create<IGlyphState>((set) => ({
  isDragging: false,

  setIsDragging: (dragging: boolean) => set({ isDragging: dragging }),
}))