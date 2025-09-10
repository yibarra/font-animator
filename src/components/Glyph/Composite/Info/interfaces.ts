import type { GroupConfig } from 'konva/lib/Group'
import type { ShapeConfig } from 'konva/lib/Shape'

export interface IButtonProps extends GroupConfig {
  icon: string
}

export type IInfoProps = ShapeConfig

export interface IInfoGlyphProps extends ShapeConfig {
  rotation: number
  x: number
  y: number
}