import type { HTMLAttributes } from 'react'
import type { IGlyph } from '../../../../../contexts/Glyphs/interfaces'

export interface IFrames extends HTMLAttributes<HTMLDivElement>, Pick<IGlyph, 'charIndex' | 'frames'>{
  currentFrame?: number
}