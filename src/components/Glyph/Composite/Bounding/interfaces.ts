import type { ShapeConfig } from 'konva/lib/Shape'

export interface IBounding extends ShapeConfig {
  arrowHeight: number
  arrowWidth: number
  vertical?: boolean
}