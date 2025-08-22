import type { ShapeConfig } from 'konva/lib/Shape'

export interface IGridProps extends ShapeConfig {
  cellSize: number
  height: number
  width: number
}