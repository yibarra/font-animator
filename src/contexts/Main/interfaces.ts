import type { PropsWithChildren } from 'react'

interface IMainStoreState {
  isVisible: boolean
  isPlaying: boolean
  isDragging: boolean
  isOpenSelector: boolean
}

interface IMainStoreActions {
  setIsVisible: (visible: boolean) => void
  setIsPlaying: (playing: boolean) => void
  setIsDragging: (dragging: boolean) => void
  setIsOpenSelector: (open: boolean) => void
}

export type IMainStore = IMainStoreState & IMainStoreActions

export interface IMainContext {
  isVisible?: boolean
  setIsVisible: (val: boolean) => void
}

export type IMainProvider = PropsWithChildren