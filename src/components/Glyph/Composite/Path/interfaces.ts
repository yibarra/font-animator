import type { RefObject } from 'react'
import type { IGlyph } from '../../../../contexts/Glyphs/interfaces'
import type { Path } from 'konva/lib/shapes/Path'

export interface IPath extends IGlyph {
  current?: boolean
  index: number
  shapeRef: RefObject<Path | null>
  setIsDragging: any
  setPositionDrag: any
  x: number
  y: number
  rotation: number
}