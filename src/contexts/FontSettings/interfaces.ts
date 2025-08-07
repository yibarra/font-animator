import type { PropsWithChildren } from 'react'
import type { Font, PathCommand } from 'fontkit'
import type { BoundingBoxPos, IGlyphPoint } from '../Glyphs/interfaces'

export interface ArrowPoint {
  x: number
  y: number
  type: 'start' | 'end' | 'closure'
}

export interface IDataGlyphCommand {
  arrows: any
  bounding: BoundingBoxPos
  commands: PathCommand[]
  path: string
  points: IGlyphPoint[]
}

export interface IFontSettingsContext {
  axes: Font['variationAxes'] | undefined
  getGlyphs: { charCode: number; item: string }[]
  getVariationAxes(): void
  getPathDataGlyph(value: number, coord: Record<string, number>, size: number): IDataGlyphCommand
}

export type IFontSettingsProvider = PropsWithChildren