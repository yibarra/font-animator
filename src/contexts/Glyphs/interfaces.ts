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
  rotation: number
}

export interface IGlyph {
  axes: IFrame['axes']
  charIndex: number
  easing: string
  frames: IFrame[]
  id: string
  position: [number, number]
  properties: ShapeConfig
  rotation: number
}

export interface IGlyphsState {
  glyphs: IGlyph[]
  addGlyph: (charIndex: number) => void
  empty: () => void
  remove: (id: string) => void
  updateGlyphFrames: (id: string, frames: IGlyph['frames']) => void
  updateGlyphs: (glyphs: IGlyph[]) => void
  updateGlyph: (id: string, glyph: IGlyph) => void
}

export interface IGlyphsContext extends Pick<IGlyphsState, 'glyphs' | 'addGlyph' | 'remove'>{
  getGlyph: (index: number) => Glyph | undefined
  setCurrent: (id: string | null) => void
  setGlyphFrameAxes: (axe: string, value: number) => void
  getGlyphVariation: (index: number, variants: number[]) => Glyph | undefined
  setGlyphProperties: (properties: ShapeConfig) => void
  setGlyphPosition: (id: string, frame: number, position: [number, number]) => void
  setGlyphRotate: (id: string, frame: number, position: [number, number], rotation: number) => void
  setGlyphInstance: (vars: number[]) => void
  setGlyphFramesAxesAnimation: (percent: number) => void
}

export type IGlyphsProvider = PropsWithChildren