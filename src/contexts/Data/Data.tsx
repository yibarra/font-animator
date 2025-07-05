import { createContext, useContext, useMemo } from 'react'

import type { IDataContext, IDataProvider } from './interfaces'

const DataContext = createContext({} as IDataContext)

const DataProvider = ({ children }: IDataProvider) => {
  // render
  return (
    <DataContext.Provider
      value={
        useMemo(() => ({
          active: true
        }), [
      ])}
    >
      {children}
    </DataContext.Provider>
  )
}

const UseDataContext = () => {
  const context = useContext(DataContext)

  if (context === undefined) {
    throw new Error(
      'DataContext must be used within a DataProvider'
    )
  }

  return context
}

export { DataContext, DataProvider, UseDataContext }
export default DataProvider
