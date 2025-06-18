import { createContext } from 'react'
import type { PropsWithChildren } from 'react'

import Providers from '../'
import SearchProvider from '../Search'

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
    <SearchProvider>
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
    </SearchProvider>
  )
}

export { MainContext, MainProvider }
export default MainProvider
