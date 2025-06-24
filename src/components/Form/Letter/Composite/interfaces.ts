import type { PropsWithChildren } from 'react'
import type { FontOver } from '../../../../contexts/Font/interfaces'

export interface LetterProps {
  font: FontOver
}

export interface LetterRootProps extends PropsWithChildren {
  font: FontOver
}