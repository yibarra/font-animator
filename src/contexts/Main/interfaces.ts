import type { PropsWithChildren } from 'react'

export interface IMainContext {
  isVisible?: boolean
  setIsVisible: (val: boolean) => void
}

export type IMainProvider = PropsWithChildren