import type { NodeConfig } from 'konva/lib/Node'
import type { ShapeConfig } from 'konva/lib/Shape'

import type { IGlyphPoint } from '../../../../contexts/Glyphs/interfaces'

export interface BezierCurveProps {
  args: number[]
  onChange?: (args: number[]) => void
  x: number
  y: number
}

export interface IMaskProps extends ShapeConfig {
  points: IGlyphPoint[]
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