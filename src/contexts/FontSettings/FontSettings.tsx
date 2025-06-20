import { createContext, useCallback, useMemo, useContext } from 'react'

import type { IFontSettingsContext, IFontSettingsProvider } from './interfaces'
import { UseFontContext } from '../Font/Font'
import { convertPathToSvg } from './utils'

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
  const getPathDataGlyph = useCallback(
    (id: number, coords: Record<string, string | number>, size: number): string => {
      if (!font || !id) {
        return ''
      }
      
      const fontInstance = font.getVariation(coords)
      const glyph = fontInstance.getGlyph(id)
      
      if (glyph) {
        const { path: { commands }} = glyph
        const units = fontInstance.unitsPerEm || 1000

        return convertPathToSvg(commands, size, units)
      }

      return ''
  }, [font])

  // render
  return (
    <FontSettingsContext.Provider
      value={
        useMemo(() => ({
          axes,
          getPathDataGlyph,
          getVariationAxes,
        }), [
          axes,
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