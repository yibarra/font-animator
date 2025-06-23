import type { Dispatch, SetStateAction } from 'react'

export interface CounterProps {
  start?: number
  end?: number
  duration?: number
  loop?: boolean
  easing?: [number, number, number, number]
  onChange?: (value: number) => void
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

export interface IAnimator {
  duration: number
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}