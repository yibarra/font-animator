import type { HTMLAttributes } from 'react'
import type { IGlyph } from '../../../../../../contexts/Glyphs/interfaces'

export interface IFrames extends HTMLAttributes<HTMLDivElement>{
  frame: IGlyph['frames'][number] | null
  glyph: IGlyph | undefined
}