import type { Dispatch, SetStateAction } from 'react'
import type { IGlyph } from '../../../../contexts/Glyphs/interfaces'
import type { PathCommand } from 'fontkit'

export interface IInfo extends Pick<IGlyph, 'id' | 'position'> {
  baseLines: boolean
  bounding: any
  currentFrame: number
  points: any
  commands: PathCommand[]
  metrics: boolean
  setBaseLines: Dispatch<SetStateAction<boolean>>
  setMetrics: Dispatch<SetStateAction<boolean>>
  skeleton: boolean
  setSkeleton: Dispatch<SetStateAction<boolean>>
  x: number
  y: number
  rotation: number
  viewPoints?: boolean
  setViewPoints: Dispatch<SetStateAction<boolean>>
}