import type { HTMLAttributes } from 'react'

export interface IRangeSlider extends HTMLAttributes<HTMLInputElement> {
  min?: number
  max?: number
  defaultValue?: number
  step?: number
  onHandler?: (value: number) => void
}