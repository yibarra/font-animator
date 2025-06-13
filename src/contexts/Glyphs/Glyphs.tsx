import { createContext, useContext, useMemo } from 'react'

import { useGlyphsStore } from './store'
import type { IGlyphsContext, IGlyphsProvider } from './interfaces'

const GlyphsContext = createContext({} as IGlyphsContext)

const GlyphsProvider = ({ children }: IGlyphsProvider) => {
  const store = useGlyphsStore()

  // render
  return (
    <GlyphsContext.Provider
      value={
        useMemo(() => ({
          glyphs: store.glyphs,
        }), [
          store,
      ])}
    >
      {children}
    </GlyphsContext.Provider>
  )
}

const UseGlyphsContext = () => {
  const context = useContext(GlyphsContext)

  if (context === undefined) {
    throw new Error(
      'GlyphsContext must be used within a GlyphsProvider'
    )
  }

  return context
}

export { GlyphsContext, GlyphsProvider, UseGlyphsContext }
export default GlyphsProvider
