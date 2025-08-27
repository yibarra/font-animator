export interface IPath {
  current?: boolean
  currentFrame: number
  index: number
  rotation: number
  setPositionDrag: (value: [number, number, number]) => void
  x: number
  y: number
}