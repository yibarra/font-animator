import type { PropsWithChildren } from 'react'
import type { Glyph } from 'fontkit'
import type { ShapeConfig } from 'konva/lib/Shape'

export interface BoundingBox {
  minX: number
  minY: number
  maxX: number
  maxY: number
  width: number
  height: number
}

export interface IGlyphPoint {
  x: number
  y: number
  type: 'on-curve' | 'control' // "on-curve" for final points, "control" for control point
}

export interface IFrame {
  axes: Record<string, string | number>
  position: [number, number]
  properties: ShapeConfig
}

export interface IGlyph {
  id: string
  charIndex: number
  easing: string
  frames: IFrame[]
}

export interface IGlyphsState {
  current: string | null
  glyphs: IGlyph[]
  add: (newLetter: Omit<IGlyph, 'id' | 'frames' | 'properties'>) => void
  empty: () => void
  remove: (id: string) => void
  updateGlyphFrames: (id: string, frames: IGlyph['frames']) => void
  updateGlyphProperties: (id: string, newProps: Record<string, string | number>) => void
  selectGlyph: (index: string) => void
  setCurrent: (glyph: IGlyph | null) => void
}

export interface IGlyphsContext extends Pick<IGlyphsState, 'glyphs' | 'current' | 'setCurrent'>{
  getGlyph: (index: number) => Glyph | undefined
  getGlyphVariation: (index: number, variants: number[]) => Glyph | undefined
  setGlyphFramePosition: (frameIndex: number, position: [number, number]) => void
  setGlyphInstance: (frameIndex: number, vars: number[]) => void
}

export type IGlyphsProvider = PropsWithChildren