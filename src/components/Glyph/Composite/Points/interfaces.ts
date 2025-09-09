import type { NodeConfig } from 'konva/lib/Node'
import type { Shape, ShapeConfig } from 'konva/lib/Shape'
import type { Stage } from 'konva/lib/Stage'

export interface BezierCurveProps {
  args: number[]
  onChange?: (args: number[]) => void
  x: number
  y: number
}

export type IMaskProps = ShapeConfig

export interface QuadraticCurveProps {
  args: number[]
  onChange?: (args: number[]) => void
  x: number
  y: number
}

export interface IPointItemProps extends ShapeConfig {
  callback: (node: Shape<ShapeConfig> | Stage) => void
}

export interface IPointProps extends NodeConfig {
  viewPoints?: boolean
}