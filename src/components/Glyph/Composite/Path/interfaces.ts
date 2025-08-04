import type { Dispatch, RefObject, SetStateAction } from 'react'
import type { IGlyph } from '../../../../contexts/Glyphs/interfaces'
import type { Path } from 'konva/lib/shapes/Path'
import type { IDataGlyphCommand } from '../../../../contexts/FontSettings/interfaces'

export interface IPath extends Pick<IGlyph, 'charIndex' | 'axes' | 'id' | 'properties'>,
  IDataGlyphCommand {
  baseLines: boolean
  current?: boolean
  currentFrame: number
  index: number
  metrics: boolean
  shapeRef: RefObject<Path | null>
  isDragging?: boolean
  skeleton?: boolean
  setIsDragging: Dispatch<SetStateAction<boolean>>
  setPositionDrag: Dispatch<SetStateAction<[number, number, number]>>
  x: number
  y: number
  rotation: number
}