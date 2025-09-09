import { createContext, useCallback, useMemo, useContext } from 'react'

import { useFontStore } from '../Font/store'
import type { IFontSettingsContext, IFontSettingsProvider } from './interfaces'

// load font context
const FontSettingsContext = createContext({} as IFontSettingsContext)

// load font provider
const FontSettingsProvider = ({ children }: IFontSettingsProvider ) => {
  const { font } = useFontStore()

  const axes = useMemo(() => (font?.variationAxes), [font?.variationAxes])

  // get axes
  const getVariationAxes = useCallback(() => {
    if (font && font.variationAxes) {
      return font.variationAxes
    }

    return false
  }, [font])

  // render
  return (
    <FontSettingsContext.Provider
      value={
        useMemo(() => ({
          axes,
          getVariationAxes,
        }), [
          axes,
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