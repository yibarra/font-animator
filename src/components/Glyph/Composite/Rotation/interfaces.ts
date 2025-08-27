import type { Dispatch, SetStateAction } from 'react'

export interface IRotationProps {
  outerCircleRadius?: number
  innerCircleRadius?: number
  setPositionDrag: Dispatch<SetStateAction<[number, number, number]>>
  rotation: number
  x: number
  y: number
}