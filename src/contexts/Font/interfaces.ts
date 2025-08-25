import type { Font } from 'fontkit'
import type { ChangeEvent, PropsWithChildren } from 'react'

export interface FontOver extends Font {
  fvar?: {
    instance: { coord: number[]}[]
  }
}

export interface IFontState {
  font: FontOver | undefined
  fontLoaded: boolean
  loadInitialFont: (fontFileName: string) => Promise<void>
  onReadFile: (file: File) => Promise<void>
  setFontLoaded: (loaded: boolean) => void
}

export interface IFontContext {
  handleFileChange(event: ChangeEvent<HTMLInputElement>): void
}

export type IFontProvider = PropsWithChildren