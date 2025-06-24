import type { RefObject } from 'react'
import type { IGlyph } from '../../../../contexts/Glyphs/interfaces'
import type { Path } from 'konva/lib/shapes/Path'

export interface IPath extends IGlyph {
  shapeRef: RefObject<Path | null>
}