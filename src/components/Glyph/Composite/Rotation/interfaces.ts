import type { Dispatch, SetStateAction } from 'react'
import type { BoundingBoxPos, IGlyph } from '../../../../contexts/Glyphs/interfaces'

export interface IRotationProps {
  bounding: BoundingBoxPos
  currentFrame: number
  glyph: IGlyph
  isDragging?: boolean
  outerCircleRadius?: number
  innerCircleRadius?: number
  setIsDragging: Dispatch<SetStateAction<boolean>>
  setPositionDrag: Dispatch<SetStateAction<[number, number, number]>>
  rotation: number
  x: number
  y: number
}