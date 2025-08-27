import type { NodeConfig } from 'konva/lib/Node'

export interface ISkeletonProps extends NodeConfig {
  holeRadius?: number
  lineColor?: string
  lineWidth?: number
}