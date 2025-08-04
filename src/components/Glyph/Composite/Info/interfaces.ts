import type { Dispatch, SetStateAction } from 'react'
import type { IGlyph } from '../../../../contexts/Glyphs/interfaces'

export interface IInfo extends Pick<IGlyph, 'id' | 'position'> {
  baseLines: boolean
  bounding: any
  currentFrame: number
  points: any
  metrics: boolean
  setBaseLines: Dispatch<SetStateAction<boolean>>
  setMetrics: Dispatch<SetStateAction<boolean>>
  skeleton: boolean
  setSkeleton: Dispatch<SetStateAction<boolean>>
  x: number
  y: number
}