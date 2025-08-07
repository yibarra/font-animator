import { createContext, useCallback, useMemo, useContext } from 'react'

import type { IDataGlyphCommand, IFontSettingsContext, IFontSettingsProvider } from './interfaces'
import { UseFontContext } from '../Font/Font'
import { convertPathToSvg, extractGlyphArrows, extractGlyphPoints } from './utils'

// load font context
const FontSettingsContext = createContext({} as IFontSettingsContext)

// load font provider
const FontSettingsProvider = ({ children }: IFontSettingsProvider ) => {
  const { font } = UseFontContext()

  const axes = useMemo(() => (font?.variationAxes), [font?.variationAxes])

  const getGlyphs = useMemo(() => {
    const count = (font?.numGlyphs ?? 0) - 1
    const glyphs = []

    const allowedUnicodeCharRegex = /^[\p{L}]$/u
    
    for (let i = 0; i < count; i++) {
      const item = String(font?.stringsForGlyph(i)?.[0] ?? ' ').trim()

      if (item.length === 1 && allowedUnicodeCharRegex.test(item)) {
        glyphs.push({
          charCode: i,
          item
        })
      }
    }

    return glyphs
  }, [font])

  // get axes
  const getVariationAxes = useCallback(() => {
    if (font && font.variationAxes) {
      return font.variationAxes
    }

    return false
  }, [font])

  // get path data - remove
  const getPathDataGlyph = useCallback(
    (id: number, coords: Record<string, string | number>, size: number): IDataGlyphCommand => {
      if (!font || !id) {
        return {
          arrows: [],
          commands: [],
          bounding: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0
          },
          path: '',
          points: []
        }
      }
      
      const fontInstance = font.getVariation(coords)
      const glyph = fontInstance.getGlyph(id)
      
      if (glyph) {
        const { bbox, path: { commands }} = glyph
        const yFlip = -1
        
        const units = fontInstance.unitsPerEm || 1000

        const bounding = {
          x1: bbox.minX * size / units,
          y1: bbox.minY * (size / units) * yFlip,
          x2: bbox.maxX * size / units,
          y2: bbox.maxY * (size / units) * yFlip,
        }

        return {
          bounding,
          commands,
          arrows: extractGlyphArrows(commands, size / units),
          path: convertPathToSvg(commands, size / units),
          points: extractGlyphPoints(commands, size / units),
        }
      }

      return {
        arrows: [],
        commands: [],
        path: '',
        bounding: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0
        },
        points: []
      }
  }, [font])

  // render
  return (
    <FontSettingsContext.Provider
      value={
        useMemo(() => ({
          axes,
          getGlyphs,
          getPathDataGlyph,
          getVariationAxes,
        }), [
          axes,
          getGlyphs,
          getPathDataGlyph,
          getVariationAxes,
        ]
      )}
    >
      {children}
    </FontSettingsContext.Provider>
  )
}

const UseFontSettingsContext = () => {
  const context = useContext(FontSettingsContext)

  if (context === undefined) {
    throw new Error(
      'FontSettingsContext must be used within a FontSettingsProvider'
    )
  }

  return context
}

export { FontSettingsContext, FontSettingsProvider, UseFontSettingsContext }
export default FontSettingsProvider