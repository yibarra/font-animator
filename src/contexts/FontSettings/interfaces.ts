import type { PropsWithChildren } from 'react'
import type { Font } from 'fontkit'

export interface IFontSettingsContext {
  axes: Font['variationAxes'] | undefined
  getVariationAxes(): void
  getPathDataGlyph(value: number, coord: Record<string, number>, size: number): {
    path: string
    bounding: Record<string, number>
  }
}

export type IFontSettingsProvider = PropsWithChildren