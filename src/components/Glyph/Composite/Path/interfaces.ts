export interface IPath {
  current?: boolean
  index: number
  rotation: number
  setPositionDrag: (value: [number, number, number]) => void
  x: number
  y: number
}