import type { SVGProps } from 'react'

export interface IGlyphSVG {
  charIndex: number
  size: number
  properties: SVGProps<SVGPathElement>
}