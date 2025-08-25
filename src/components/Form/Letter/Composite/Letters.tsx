import { useMemo } from 'react'

import { UseLetterContext } from '../Context'
import type { LetterProps } from './interfaces'
import { UseMainContext } from '../../../../contexts/Main/Main'

const Letters = ({ font }: LetterProps) => {
  const { setIsVisible } = UseMainContext()
  const { onHandlerAddGlyph } = UseLetterContext()

  const item = useMemo(() => {
    for (let i = 0; i < font.numGlyphs; i++) {
      const glyph = font.getGlyph(i)

      if (glyph.name === 'E') {
        return glyph
      }
    }

    return null
  }, [font])

  return (
    <button
      onClick={(event) => {
        event.preventDefault()

        setIsVisible(false)
        onHandlerAddGlyph(item?.id ?? 70, event.clientX, event.clientY + 220)}
      }
    >
      <span className="material-symbols-outlined">
        text_increase
      </span>
    </button>
  )
}

Letters.displayName = 'Form.Letters'
export default Letters