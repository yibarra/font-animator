import type { PropsWithChildren } from 'react'
import type { Font } from 'fontkit'
import type { BoundingBoxPos } from '../Glyphs/interfaces'

export interface IFontSettingsContext {
  axes: Font['variationAxes'] | undefined
  getGlyphs: { charCode: number; item: string }[]
  getVariationAxes(): void
  getPathDataGlyph(value: number, coord: Record<string, number>, size: number): {
    path: string
    bounding: BoundingBoxPos
  }
}

export type IFontSettingsProvider = PropsWithChildren