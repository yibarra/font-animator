import { useState, createContext, useContext, useMemo, useCallback } from 'react'

import { UseFontSettingsContext } from '../../contexts/FontSettings'
import type { GlyphContextProps, IGlyphProviderProps, IViewOptions } from './interfaces'

const GlyphContext = createContext<GlyphContextProps | undefined>(undefined)

const GlyphProvider = ({ children, data, ...props }: IGlyphProviderProps) => {
  const { getPathDataGlyph } = UseFontSettingsContext()

  const [state, setState] = useState<IViewOptions>({
    currentFrame: 0,
    metrics: true,
    baseLines: true,
    skeleton: true,
    viewPoints: false,
    viewCommands: false,
  })

  const path = getPathDataGlyph(
    data.charIndex,
    data.axes,
    data.properties.fontSize
  )

  const updateState = useCallback((key: string, value: boolean) => (
    setState((prev) => ({
      ...prev,
      [key]: value,
    }))
  ), [])

  return (
    <GlyphContext.Provider value={
      useMemo(() => ({
        ...props,
        data,
        path,
        state,
        setState,
        updateState
      }), [
        props,
        data,
        path,
        state,
        setState,
        updateState
      ])}
    >
      {children}
    </GlyphContext.Provider>
  )
}

const UseGlyphContext = () => {
  const context = useContext(GlyphContext)

  if (!context) {
    throw new Error('useGlyphContext must be used within a GlyphProvider')
  }
  
  return context
}

export { GlyphContext, GlyphProvider, UseGlyphContext }
export default GlyphProvider