import type { IGlyph } from '../../contexts/Glyphs/interfaces'

export interface IGlyphState {
  isDragging: boolean
  setIsDragging: (dragging: boolean) => void
}

export interface IGlyphProps {
  data: IGlyph
  isPlaying?: boolean
}