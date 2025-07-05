import { UseFontContext } from '../../contexts/Font/Font'
import type { IGlyphSVG } from './interfaces'

const GlyphSVG = ({ charIndex, size, properties }: IGlyphSVG) => {
  const { font } = UseFontContext()

  return (
    <svg viewBox="0 0 1000 1000" width={size} height={size}>
      <g transform="scale(1, -1) translate(0, -1000)">
        <path {...properties} d={font?.getGlyph(charIndex).path.toSVG()} />
      </g>
    </svg>
  )
}

GlyphSVG.displayName = 'Components.GlyphSVG'
export default GlyphSVG