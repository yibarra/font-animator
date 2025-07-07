import { createContext, useContext, useMemo, useState } from 'react'

import Providers from '../'
import GridProvider from '../Grid'
import type { IMainContext, IMainProvider } from './interfaces'

// Main Context
const MainContext = createContext({} as IMainContext)

// Main Provider
const MainProvider = ({ children }: IMainProvider) => {
  const [isVisible, setIsVisible] = useState(false)
  /**
   * state: 
   * options: { duration: mm }
   */

  return (
    <MainContext.Provider
      value={useMemo(() => ({
        isVisible,
        setIsVisible
      }), [isVisible, setIsVisible])}
    >
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

const UseMainContext = () => {
  const context = useContext(MainContext)

  if (context === undefined) {
    throw new Error(
      'GlyphsContext must be used within a GlyphsProvider'
    )
  }

  return context
}

export { MainContext, MainProvider, UseMainContext }
export default MainProvider
