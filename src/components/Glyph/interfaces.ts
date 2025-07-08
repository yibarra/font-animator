import type { IGlyph } from '../../contexts/Glyphs/interfaces'

export interface IGlyphState {
  isDragging: boolean
  setIsDragging: (dragging: boolean) => void
}

export interface IGlyphProps {
  current: boolean
  data: IGlyph
  index: number
  isPlaying?: boolean
}