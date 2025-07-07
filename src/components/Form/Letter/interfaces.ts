import type { PropsWithChildren } from 'react'
import type { FontOver } from '../../../contexts/Font/interfaces'

export type IGlyphForm = {
  id: number
  name: string
  path: string
  unicode: number
}

export interface ILetterContext {
  glyphs: IGlyphForm[]
  onHandlerAddGlyph: (charIndex: number, x: number, y: number) => void
}

export interface ILetterProvider extends PropsWithChildren {
  font: FontOver
}