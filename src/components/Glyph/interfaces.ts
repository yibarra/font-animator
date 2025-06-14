import type { IGlyph } from '../../contexts/Glyphs/interfaces'

export interface IGlyphState {
  currentFrame: number
  isDragging: boolean
  setCurrentFrame: (frame: number) => void
  setIsDragging: (dragging: boolean) => void
}

export interface IGlyphProps {
  current?: boolean
  data: IGlyph
}