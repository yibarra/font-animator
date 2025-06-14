import type { Font } from 'fontkit'
import type { ChangeEvent, PropsWithChildren } from 'react'

export interface IFontState {
  font: Font | undefined
  fontLoaded: boolean
  loadInitialFont: (fontFileName: string) => Promise<void>
  onReadFile: (file: File) => Promise<void>
  setFontLoaded: (loaded: boolean) => void
}

export interface IFontContext extends Omit<IFontState, 'loadInitialFont' | 'setFontLoaded' | 'onReadFile'> {
  handleFileChange(event: ChangeEvent<HTMLInputElement>): void
}

export type IFontProvider = PropsWithChildren