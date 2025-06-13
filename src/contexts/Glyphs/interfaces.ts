import type { Glyph } from 'fontkit'
import type { PropsWithChildren } from 'react'

export interface IGlyph {
  id: string
  charIndex: number
  duration: number
  easing: string
  glyph?: Glyph
  frames: object[]
  position: [number, number]
  properties: Record<string, string | number>
}

export interface IGlyphsState {
  current: IGlyph | null
  glyphs: IGlyph[]
  add: (newLetter: Omit<IGlyph, 'id' | 'frames' | 'properties'>) => void
  empty: () => void
  remove: (id: string) => void
  updateGlyphFrames: (id: string, frames: object[]) => void
  updateGlyphProperties: (id: string, newProps: Record<string, string | number>) => void
  selectGlyph: (id: string | null) => void
  setCurrent: (glyph: IGlyph | null) => void
}

export interface IGlyphsContext extends Pick<IGlyphsState, 'glyphs'>{
  any?: boolean
}

export type IGlyphsProvider = PropsWithChildren