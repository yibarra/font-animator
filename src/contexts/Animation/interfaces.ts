import type { PropsWithChildren } from 'react'
import type { IGlyph } from '../Glyphs/interfaces'

export interface IAnimationContext {
  active: boolean
}

export interface IAnimationProvider extends PropsWithChildren {
  glyph: IGlyph
  duration: number
}