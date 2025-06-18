import { createContext } from 'react'
import type { PropsWithChildren } from 'react'

import FontProvider from '../Font'
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
      <FontProvider>
        <MainContext.Provider value={{
          active: true,
        }}>
          {children}
        </MainContext.Provider>
      </FontProvider>
    </SearchProvider>
  )
}

export { MainContext, MainProvider }
export default MainProvider
