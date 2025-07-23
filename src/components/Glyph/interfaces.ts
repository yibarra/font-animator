import type { Dispatch, SetStateAction } from 'react'
import type { IGlyph } from '../../contexts/Glyphs/interfaces'

export interface IGlyphState {
  isDragging?: boolean
  setIsDragging: Dispatch<SetStateAction<boolean>>
}

export interface IGlyphProps extends IGlyphState {
  current: boolean
  data: IGlyph
  index: number
  isPlaying?: boolean
}