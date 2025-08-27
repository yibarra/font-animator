import type { PropsWithChildren } from 'react'
import type { Glyph } from 'fontkit'
import type { ShapeConfig } from 'konva/lib/Shape'

export interface IData {
  current: number | null
  glyphs: IGlyph[]
  config: {
    arrows: {
      count: number
      fill: string
      pointerLength: number
      pointerWidth: number
    }
    glyph: {
      bounding: {
        pointerLength: number
        pointerWidth: number
        fill: string
        stroke: string
        strokeWidth: number
      }
    },
    path: {
      shadowColor: string
      shadowOffset: { x: number, y: number }
      shadowBlur: number
      shadowEnabled: boolean
    }
  }
}

export interface IBoundingBoxPos {
  x1: number
  x2: number
  y1: number
  y2: number
}

export interface IGlyphPoint {
  x: number
  y: number
  type: 'on-curve' | 'control' // "on-curve" for final points, "control" for control point
}

export interface IFrame {
  axes: Record<string, number>
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

export interface IGlyphsState extends IData {
  addGlyph: (charIndex: number, x: number, y: number, axes: Record<string, number>) => void
  empty: () => void
  initializeData: (data: Partial<IGlyphsState>) => void
  setCurrent: (current: number | null) => void
  remove: (id: string) => void
  updateGlyphFrames: (id: string, frames: IGlyph['frames']) => void
  updateGlyphs: (glyphs: IGlyph[]) => void
  updateGlyph: (id: string, charIndex: number) => void

  updateGlyphAxes: (id: string, axes: Record<string, number>, frame?: number) => void
  updateGlyphRotation: (id: string, rotation: number, frame?: number) => void
  updateGlyphPosition: (id: string, position: [number, number], frame?: number) => void
  updateGlyphProperties: (id: string, properties: ShapeConfig) => void
}

export interface IGlyphsContext {
  getGlyph: (index: number) => Glyph | undefined
  saveLocalStorage: () => void
  setGlyphFrameAxes: (id: string, frame: number, axes: Record<string, number>) => void
  getGlyphVariation: (index: number, variants: number[]) => Glyph | undefined
  setGlyphPosition: (id: string, frame: number, position: [number, number]) => void
  setGlyphRotate: (id: string, frame: number, positions: [number, number], rotation: number) => void
  setGlyphInstance: (id: string, frame: number, coords: number[]) => void
  setGlyphFramesAxesAnimation: (percent: number) => void
}

export type IGlyphsProvider = PropsWithChildren