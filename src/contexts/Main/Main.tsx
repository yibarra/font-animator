import { createContext } from 'react'
import type { PropsWithChildren } from 'react'

import LoadFontProvider from '../LoadFont'

// Main Context
const MainContext = createContext({
  active: true,
})

// Main Provider
const MainProvider = ({ children }: PropsWithChildren) => {
  /**
   * state: 
   * letters[]: { position: [x, y], char: string, glyph: GlyphFont, frames: [path1, path2, ...], easing: string, properties: svgProps }
   * options: { duration: mm }
   */

  return (
    <LoadFontProvider>
      <MainContext.Provider value={{
        active: true,
      }}>
        {children}
      </MainContext.Provider>
    </LoadFontProvider>
  )
}

export { MainContext, MainProvider }
export default MainProvider
