import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'

import type { IFontContext, IFontProvider } from './interfaces'

import { useFontStore } from './store'

const FontContext = createContext({} as IFontContext)

const FontProvider = ({ children }: IFontProvider ) => {
  const { loadInitialFont, onReadFile } = useFontStore()

  // handle file change
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onReadFile(event.target.files[0])
    }
  }, [onReadFile])

  // use effect
  useEffect(() => {
    loadInitialFont('/fonts/font.ttf') 
  }, [loadInitialFont])

  // render
  return (
    <FontContext.Provider
      value={useMemo(() => ({
        handleFileChange
      }), [
        handleFileChange,
    ])}
    >
      {children}
    </FontContext.Provider>
  )
}

const UseFontContext = () => {
  const context = useContext(FontContext)

  if (context === undefined) {
    throw new Error(
      'FontContext must be used within a FontProvider'
    )
  }

  return context
}

export { FontContext, FontProvider, UseFontContext }
export default FontProvider
