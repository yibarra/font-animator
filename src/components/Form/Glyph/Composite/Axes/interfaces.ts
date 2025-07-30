import type { IGlyph } from '../../../../../contexts/Glyphs/interfaces'

export interface IAxes extends Pick<IGlyph, 'id'> {
  currentFrame?: number
  char?: string
  frame: IGlyph['frames'][number] | null
}