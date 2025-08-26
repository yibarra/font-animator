import type { ShapeConfig } from 'konva/lib/Shape'
import type { IArrowsArray } from '../../../../contexts/FontSettings/interfaces'

export interface IArrowsPointProps extends ShapeConfig {
  arrows?: IArrowsArray
  count?: number
  pointerLength?: number
  pointerWidth?: number
}