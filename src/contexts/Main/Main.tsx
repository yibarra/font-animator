import { createContext } from 'react'
import type { PropsWithChildren } from 'react'

import FontProvider from '../Font'

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
    <FontProvider>
      <MainContext.Provider value={{
        active: true,
      }}>
        {children}
      </MainContext.Provider>
    </FontProvider>
  )
}

export { MainContext, MainProvider }
export default MainProvider
