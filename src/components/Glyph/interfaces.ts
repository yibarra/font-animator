import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'

import type { IGlyph } from '../../contexts/Glyphs/interfaces'
import type { IDataGlyphCommand } from '../../contexts/FontSettings/interfaces'

export interface IGlyphProviderProps extends PropsWithChildren {
  data: IGlyph
}

export interface GlyphContextProps extends Pick<IGlyphProviderProps, 'data'> {
  path: IDataGlyphCommand
  state: IViewOptions
  setState: Dispatch<SetStateAction<IViewOptions>>
  updateState: (key: string, value: boolean) => void
}

export interface IViewOptions {
  currentFrame: number
  metrics: boolean
  baseLines: boolean
  skeleton: boolean
  viewPoints: boolean
  viewCommands: boolean
}

export interface IGlyphProps {
  current: boolean
  data: IGlyph
  index: number
}