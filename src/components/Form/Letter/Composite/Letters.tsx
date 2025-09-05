import { useMemo } from 'react'

import { UseLetterContext } from '../Context'
import { useMainStore } from '../../../../contexts/Main/store'
import type { LetterProps } from './interfaces'

const Letters = ({ font }: LetterProps) => {
  const { setIsVisible } = useMainStore()
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

        if (event.currentTarget) {
          const { x } = event.currentTarget.getBoundingClientRect()
  
          setIsVisible(false)
          onHandlerAddGlyph(item?.id ?? 70, x, event.clientY)}
        }
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