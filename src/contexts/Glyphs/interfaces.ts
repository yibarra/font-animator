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
}

export interface IGlyph {
  axes: IFrame['axes']
  charIndex: number
  easing: string
  frames: IFrame[]
  id: string
  position: [number, number]
  properties: ShapeConfig
}

export interface IGlyphsState {
  current: string | null
  glyphs: IGlyph[]
  add: (newLetter: Omit<IGlyph, 'id' | 'frames' | 'properties'>) => void
  empty: () => void
  remove: (id: string) => void
  updateGlyphFrames: (id: string, frames: IGlyph['frames']) => void
  selectGlyph: (index: string) => void
  setCurrent: (glyph: IGlyph | null) => void
  updateGlyphs: (glyphs: IGlyph[]) => void
  updateGlyph: (id: string, glyph: IGlyph) => void
}

export interface IGlyphsContext extends Pick<IGlyphsState, 'glyphs' | 'current' | 'setCurrent'>{
  getGlyph: (index: number) => Glyph | undefined
  setGlyphFrameAxes: (axe: string, value: number) => void
  getGlyphVariation: (index: number, variants: number[]) => Glyph | undefined
  setGlyphProperties: (properties: ShapeConfig) => void
  setGlyphFramePosition: (frameIndex: number, position: [number, number]) => void
  setGlyphInstance: (vars: number[]) => void
  setGlyphFramesAxesAnimation: (percent: number) => void
}

export type IGlyphsProvider = PropsWithChildren