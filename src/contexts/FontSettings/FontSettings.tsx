import { createContext, useCallback, useMemo, useContext } from 'react'

import type { IFontSettingsContext, IFontSettingsProvider } from './interfaces'
import type { IGlyphPoint } from '../Glyphs/interfaces'
import { UseFontContext } from '../Font/Font'
import { convertPathToSvg, extractGlyphPoints } from './utils'

// load font context
const FontSettingsContext = createContext({} as IFontSettingsContext)

// load font provider
const FontSettingsProvider = ({ children }: IFontSettingsProvider ) => {
  const { font } = UseFontContext()
  const axes = useMemo(() => (font?.variationAxes), [font?.variationAxes])

  // get axes
  const getVariationAxes = useCallback(() => {
    if (font && font.variationAxes) {
      return font.variationAxes
    }

    return false
  }, [font])

  // get path data - remove
  const getPathDataAndPointsForGlyph = useCallback(
    (id: number, coords: Record<string, string | number>, size: number): {
      path: string
      points: IGlyphPoint[]
    } => {
      if (!font || !id) {
        return { path: '', points: [] }
      }

      const fontInstance = font.getVariation(coords)
      const glyph = fontInstance.getGlyph(id)

      if (glyph) {
        const { path: { commands }} = glyph
        const units = fontInstance.unitsPerEm || 1000

        const path = convertPathToSvg(commands, size, units)
        const points = extractGlyphPoints(commands, size, units)

        return { path, points }
      }

      return { path: '', points: [] }
  }, [font])

  // render
  return (
    <FontSettingsContext.Provider
      value={
        useMemo(() => ({
          axes,
          getPathDataAndPointsForGlyph,
          getVariationAxes,
        }), [
          axes,
          getPathDataAndPointsForGlyph,
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