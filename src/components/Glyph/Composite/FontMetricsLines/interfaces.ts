import type { NodeConfig } from 'konva/lib/Node'

export interface FontMetricsLinesProps extends NodeConfig {
  x: number
  y: number
  path?: string
  fontSize: number
  rotation: number
  width: number
}