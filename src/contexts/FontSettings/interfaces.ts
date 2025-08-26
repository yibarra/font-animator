import type { PropsWithChildren } from 'react'
import type { Font, PathCommand } from 'fontkit'
import type { BoundingBoxPos, IGlyphPoint } from '../Glyphs/interfaces'

export interface ArrowPoint {
  x: number
  y: number
  type?: 'start' | 'end' | 'closure'
}

export type IArrowsProps = {
  point: ArrowPoint
  direction: ArrowPoint
}

export type IArrowsArray = (IArrowsProps | null)[]

export interface IDataGlyphCommand {
  arrows: IArrowsArray | []
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