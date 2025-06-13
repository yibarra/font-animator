import type { PropsWithChildren } from 'react'
import type { Font } from 'fontkit'

export interface IGlyphPoint {
  x: number
  y: number
  type: 'on-curve' | 'control' // "on-curve" for final points, "control" for control point
}

export interface IFontSettingsContext {
  axes: Font['variationAxes'] | undefined
  getVariationAxes(): void
  getPathDataAndPointsForGlyph(value: number, coord: Record<string, number>, size: number): { path: string, points: IGlyphPoint[] }
}

export type IFontSettingsProvider = PropsWithChildren