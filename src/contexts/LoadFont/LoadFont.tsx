import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'

import FontSettingsProvider from '../FontSettings'
import type { ILoadFontContext, ILoadFontProvider } from './interfaces'

import { useFontStore } from './store'

const LoadFontContext = createContext({} as ILoadFontContext)

const LoadFontProvider = ({ children }: ILoadFontProvider ) => {
  const { loadInitialFont, onReadFile, ...store } = useFontStore()

  // handle file change
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onReadFile(event.target.files[0])
    }
  }, [onReadFile])

  // use effect
  useEffect(() => {
    loadInitialFont('/fonts/canal-brasil.ttf') 
  }, [loadInitialFont])

  // render
  return (
    <LoadFontContext.Provider
      value={useMemo(() => ({
        ...store,
        handleFileChange
      }), [
        store,
        handleFileChange,
    ])}
    >
      <FontSettingsProvider>
        {children}
      </FontSettingsProvider>
    </LoadFontContext.Provider>
  )
}

const UseLoadFontContext = () => {
  const context = useContext(LoadFontContext)

  if (context === undefined) {
    throw new Error(
      'LoadFontContext must be used within a LoadFontProvider'
    )
  }

  return context
}

export { LoadFontContext, LoadFontProvider, UseLoadFontContext }
export default LoadFontProvider
