import type { RefObject } from 'react'
import type { IFrame } from '../../../../contexts/Glyphs/interfaces'
import type { Path } from 'konva/lib/shapes/Path'

export interface IPath {
  charIndex: number
  frame: IFrame
  shapeRef: RefObject<Path | null>
  onUpdateTransform: (rotation: number) => void
}