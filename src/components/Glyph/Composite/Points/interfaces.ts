import type { NodeConfig } from 'konva/lib/Node'

export interface BezierCurveProps {
  args: number[]
  onChange?: (args: number[]) => void
  x: number
  y: number
}

export interface QuadraticCurveProps {
  args: number[]
  onChange?: (args: number[]) => void
  x: number
  y: number
}

export interface IPointProps extends NodeConfig {
  viewPoints?: boolean
}