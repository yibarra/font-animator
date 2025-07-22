import type { IGlyphPoint } from '../../../../contexts/Glyphs/interfaces'

export interface ISkeletonProps {
  holeRadius?: number
  lineColor?: string
  lineWidth?: number
  pathData?: string
  points: IGlyphPoint[]
}