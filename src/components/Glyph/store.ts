import { create } from 'zustand'

import type { IGlyphState } from './interfaces'

export const useGlyphStore = create<IGlyphState>((set) => ({
  isDragging: false,
  currentFrame: 0,

  setIsDragging: (dragging: boolean) => set({ isDragging: dragging }),
  setCurrentFrame: (frame: number) => set({ currentFrame: frame }),
}))