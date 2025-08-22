import type { NodeConfig } from 'konva/lib/Node'
import type { IGlyphPoint } from '../../../../contexts/Glyphs/interfaces'

export interface IPointProps extends NodeConfig {
  points: IGlyphPoint[]
  viewPoints?: boolean
}