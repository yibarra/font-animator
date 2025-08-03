import type { Dispatch, SetStateAction } from 'react'
import type { IGlyph } from '../../../../contexts/Glyphs/interfaces'

export interface IInfo extends Pick<IGlyph, 'id' | 'position'> {
  currentFrame: number
  bounding: any
  points: any
  x: number
  y: number
  skeleton: boolean
  setSkeleton: Dispatch<SetStateAction<boolean>>
}