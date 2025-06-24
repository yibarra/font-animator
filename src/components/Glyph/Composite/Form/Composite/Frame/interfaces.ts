import type { IGlyph } from '../../../../../../contexts/Glyphs/interfaces'

export interface IFrame {
  frame: IGlyph['frames'][number] | null
  glyph: IGlyph
}
