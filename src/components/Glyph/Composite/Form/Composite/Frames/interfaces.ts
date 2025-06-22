import type { HTMLAttributes } from 'react'
import type { IGlyph } from '../../../../../../contexts/Glyphs/interfaces'

export interface IFrames extends HTMLAttributes<HTMLDivElement>{
  currentFrame: number
  glyph: IGlyph | undefined
}