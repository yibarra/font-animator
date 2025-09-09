import type { PropsWithChildren } from 'react'
import type { Font, PathCommand } from 'fontkit'

import type { IBoundingBoxPos } from '../Glyphs/interfaces'

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
  width: number
}

export interface IFontSettingsContext {
  axes: Font['variationAxes'] | undefined
  getVariationAxes(): void
}

export type IFontSettingsProvider = PropsWithChildren