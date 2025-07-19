import type { BoundingBoxPos, IGlyph } from '../../../../contexts/Glyphs/interfaces'

export interface IRotationProps {
  bounding: BoundingBoxPos
  glyph: IGlyph
  isDragging?: boolean
  outerCircleRadius?: number
  innerCircleRadius?: number
  setIsDragging: any
  setPositionDrag: any
  rotation: number
  x: number
  y: number
}