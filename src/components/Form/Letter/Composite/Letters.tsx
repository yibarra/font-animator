import { useMemo } from 'react'

import { UseLetterContext } from '../Context'
import type { LetterProps } from './interfaces'

const Letters = ({ font }: LetterProps) => {
  const { onHandlerAddGlyph } = UseLetterContext()

  const glyphs = useMemo(() => {
    const glyphList = []

    for (let i = 0; i < font.numGlyphs; i++) {
      const glyph = font.getGlyph(i)

      glyphList.push({
        id: glyph.id,
        name: glyph.name,
        path: glyph.path.toSVG(),
        unicode: glyph.codePoints?.[0] ?? null,
      })
    }

    return glyphList
  }, [font])

  return (
    <div
      style={{
        fontFamily: font?.familyName,
      }}
    >
      {Array.isArray(glyphs) && glyphs.map((glyph, index) => (
        <button
          key={glyph.id}
          onClick={() => onHandlerAddGlyph(index)}
          style={{
            fontFamily: font?.familyName,
          }}
        >
          <svg viewBox="0 0 1000 1000" width="30" height="30">
             <g transform="scale(1, -1) translate(0, -1000)">
              <path d={glyph.path} fill="black" />
             </g>
          </svg>
        </button>
      ))}
    </div>
  )
}

Letters.displayName = 'Form.Letters'
export default Letters