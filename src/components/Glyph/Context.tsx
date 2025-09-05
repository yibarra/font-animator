import { useState, createContext, useContext, useMemo, useCallback, useRef } from 'react'
import type { Group } from 'konva/lib/Group'
import type { Path } from 'konva/lib/shapes/Path'

import { UseFontSettingsContext } from '../../contexts/FontSettings'
import type { GlyphContextProps, IGlyphProviderProps, IViewOptions } from './interfaces'

const GlyphContext = createContext<GlyphContextProps | undefined>(undefined)

const GlyphProvider = ({ children, data, ...props }: IGlyphProviderProps) => {
  const { getPathDataGlyph } = UseFontSettingsContext()

  const groupRef = useRef<Group | null>(null)
  const shapeRef = useRef<Path | null>(null)

  const [state, setState] = useState<IViewOptions>({
    currentFrame: 0,
    metrics: true,
    skeleton: false,
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
        groupRef,
        shapeRef,
        path,
        state,
        setState,
        updateState
      }), [
        props,
        data,
        groupRef,
        shapeRef,
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