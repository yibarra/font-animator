import type { HTMLAttributes } from 'react'
import type { IGlyph } from '../../../../contexts/Glyphs/interfaces'

export interface IForm extends HTMLAttributes<HTMLDivElement> {
  glyph: IGlyph | undefined
}