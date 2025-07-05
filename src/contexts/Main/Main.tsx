import { createContext } from 'react'
import type { PropsWithChildren } from 'react'

import Providers from '../'
import GridProvider from '../Grid'

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
      <Providers.DataProvider>
        <Providers.FontProvider>
          <Providers.FontSettingsProvider>
            <Providers.GlyphsProvider>
              <GridProvider
                gridConfig={{
                  cellSize: 50,
                  gridColor: 'lightgray',
                  gridLineWidth: 1,
                }}
              >
                {children}
              </GridProvider>
            </Providers.GlyphsProvider>
          </Providers.FontSettingsProvider>
        </Providers.FontProvider>
      </Providers.DataProvider>
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }
export default MainProvider
