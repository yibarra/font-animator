import { createContext, useCallback, useContext, useMemo } from 'react'

import { UseGlyphsContext } from '../../../contexts/Glyphs/Glyphs'
import type { ILetterContext, ILetterProvider } from './interfaces'

const LetterContext = createContext({} as ILetterContext)

const LetterProvider = ({ children, font }: ILetterProvider) => {
  const { add } = UseGlyphsContext()

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

  const onHandlerAddGlyph = useCallback((charIndex: number) => {
    add(charIndex)
  }, [add])

  return (
    <LetterContext.Provider
      value={
        useMemo(() => ({
          glyphs,
          onHandlerAddGlyph
        }), [glyphs, onHandlerAddGlyph]
      )}
    >
      {children}
    </LetterContext.Provider>
  )
}

const UseLetterContext = () => {
  const context = useContext(LetterContext)

  if (!context) {
    throw new Error('useLetterContext must be used within a LetterProvider')
  }

  return context
}

export { LetterContext, LetterProvider, UseLetterContext }
export default LetterProvider
