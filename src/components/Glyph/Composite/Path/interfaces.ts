import type { Dispatch, RefObject, SetStateAction } from 'react'
import type { IGlyph } from '../../../../contexts/Glyphs/interfaces'
import type { Path } from 'konva/lib/shapes/Path'

export interface IPath extends IGlyph {
  current?: boolean
  index: number
  shapeRef: RefObject<Path | null>
  isDragging?: boolean
  skeleton?: boolean
  setIsDragging: Dispatch<SetStateAction<boolean>>
  setPositionDrag: Dispatch<SetStateAction<[number, number, number]>>
  x: number
  y: number
  rotation: number
}