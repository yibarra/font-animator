import type { PropsWithChildren } from 'react'

interface IMainStoreState {
  isDragging: boolean
  isOpenSelector: boolean
  isRotation: boolean
  isPlaying: boolean
  isVisible: boolean
}

interface IMainStoreActions {
  setIsDragging: (dragging: boolean) => void
  setIsPlaying: (playing: boolean) => void
  setIsRotation: (rotation: boolean) => void
  setIsOpenSelector: (open: boolean) => void
  setIsVisible: (visible: boolean) => void
}

export type IMainStore = IMainStoreState & IMainStoreActions

export interface IMainContext {
  isVisible?: boolean
  setIsVisible: (val: boolean) => void
}

export type IMainProvider = PropsWithChildren