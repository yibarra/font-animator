import type { ShapeConfig } from 'konva/lib/Shape'
import type { BoundingBoxPos } from '../../../../contexts/Glyphs/interfaces'

export interface IBounding {
  arrowHeight: number
  arrowWidth: number
  bounding: BoundingBoxPos
  properties: ShapeConfig
  vertical?: boolean
}