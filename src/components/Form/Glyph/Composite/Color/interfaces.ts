import type { IGlyph } from '../../../../../contexts/Glyphs/interfaces'

export interface IColor extends Pick<IGlyph, 'id'> {
  color: string | CanvasGradient
  property: string
}