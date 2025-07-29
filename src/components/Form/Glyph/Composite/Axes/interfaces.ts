import type { IGlyph } from '../../../../../contexts/Glyphs/interfaces'

export interface IAxes {
  currentFrame?: number
  glyph: IGlyph | undefined
  frame: IGlyph['frames'][number] | null
}