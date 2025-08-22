import type { PropsWithChildren, ReactElement } from 'react'
import type { IGlyph } from '../../../contexts/Glyphs/interfaces'

export interface TabItems {
  label: string
  startIndex: number
  endIndex: number
  glyphIndexes: number[]
}

export interface Tab {
  label: string
  index?: number
  isActive?: boolean
}

export interface ITabProps {
  items: Tab[]
  isActive?: number
  callback?: (index: number) => void
}

export interface ITabPanelProps {
  id: IGlyph['id']
  frame: IGlyph['frames'][0]
  items: TabItems
  index?: number
  isActive?: boolean
}

export interface ITabs extends PropsWithChildren {
  children: Array<ReactElement<ITabProps | ITabPanelProps>>
  defaultActiveTab?: number
}