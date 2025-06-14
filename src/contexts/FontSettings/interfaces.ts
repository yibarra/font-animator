import type { PropsWithChildren } from 'react'
import type { Font } from 'fontkit'
import type { IGlyphPoint } from '../Glyphs/interfaces'

export interface IFontSettingsContext {
  axes: Font['variationAxes'] | undefined
  getVariationAxes(): void
  getPathDataAndPointsForGlyph(value: number, coord: Record<string, number>, size: number): { path: string, points: IGlyphPoint[] }
}

export type IFontSettingsProvider = PropsWithChildren