import { createContext } from 'react'
import type { PropsWithChildren } from 'react'

import Providers from '../'

// Main Context
const MainContext = createContext({
  active: true,
})

// Main Provider
const MainProvider = ({ children }: PropsWithChildren) => {
  /**
   * state: 
   * options: { duration: mm }
   */

  return (
    <MainContext.Provider value={{
      active: true,
    }}>
      <Providers.FontProvider>
        <Providers.FontSettingsProvider>
          <Providers.GlyphsProvider>
            {children}
          </Providers.GlyphsProvider>
        </Providers.FontSettingsProvider>
      </Providers.FontProvider>
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }
export default MainProvider
