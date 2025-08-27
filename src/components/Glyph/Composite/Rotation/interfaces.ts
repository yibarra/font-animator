import type { Dispatch, SetStateAction } from 'react'

export interface IRotationProps {
  currentFrame: number
  outerCircleRadius?: number
  innerCircleRadius?: number
  setPositionDrag: Dispatch<SetStateAction<[number, number, number]>>
  rotation: number
  x: number
  y: number
}