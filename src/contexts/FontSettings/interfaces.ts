import type { PropsWithChildren } from 'react'
import type { Font, PathCommand } from 'fontkit'
import type { IBoundingBoxPos, IGlyphPoint } from '../Glyphs/interfaces'

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
  bounding: IBoundingBoxPos
  commands: PathCommand[]
  height: number
  isLigature: boolean
  isMark: boolean
  name: string
  path: string
  points: IGlyphPoint[]
  width: number
}

export interface IFontSettingsContext {
  axes: Font['variationAxes'] | undefined
  getGlyphs: { charCode: number; item: string }[]
  getVariationAxes(): void
  getPathDataGlyph(value: number, coord: Record<string, number>, size: number): IDataGlyphCommand
}

export type IFontSettingsProvider = PropsWithChildren