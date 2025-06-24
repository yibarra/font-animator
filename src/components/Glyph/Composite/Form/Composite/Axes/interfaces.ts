import type { IGlyph } from '../../../../../../contexts/Glyphs/interfaces'

export interface IAxes {
  glyph: IGlyph | undefined
  frame: IGlyph['frames'][number] | null
}