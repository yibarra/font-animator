import type { NodeConfig } from 'konva/lib/Node'
import type { IGlyphPoint } from '../../../../contexts/Glyphs/interfaces'

export interface ISkeletonProps extends NodeConfig {
  holeRadius?: number
  lineColor?: string
  lineWidth?: number
  pathData?: string
  points: IGlyphPoint[]
}