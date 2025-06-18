import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ShapeConfig } from 'konva/lib/Shape'

import { useGlyphsStore } from './store'
import { UseFontContext } from '../Font/Font'
import { UseFontSettingsContext } from '../FontSettings/FontSettings'
import type { IGlyph, IGlyphsContext, IGlyphsProvider } from './interfaces'
import { useSearchStore } from '../Search/store'

// glyph context
const GlyphsContext = createContext({} as IGlyphsContext)

// glyph provider
const GlyphsProvider = ({ children }: IGlyphsProvider) => {
  const { font } = UseFontContext()
  const { axes } = UseFontSettingsContext()

  const { current, glyphs, setCurrent, updateGlyphFrames } = useGlyphsStore()
  const { removeParam, setParam, urlParams } = useSearchStore()

  // get glyph
  const getGlyph = useCallback((index: number) => font?.getGlyph(index), [font])

  // set current glyph contexts
  const setCurrentGlyphContexts = useCallback((glyph: IGlyph | null) => {
    if (glyph) {
      setParam('current', glyph.id)
    } else {
      removeParam('current')
    }

    setCurrent(glyph)
  }, [removeParam, setCurrent, setParam])

  // get glyph variation
  const getGlyphVariation = useCallback((index: number, variations: number[]) => {
    if (!font) {
      return
    }

    const fontInstance = font.getVariation(variations)

    return fontInstance.getGlyph(index)
  }, [font])

  // set glyph instance
  const setGlyphInstance = useCallback((frameIndex: number, vars: number[]) => {
    if (!urlParams['current']) {
      return 
    }

    const selected = glyphs.find((glyph) => glyph.id === urlParams['current'])

    if (selected && axes instanceof Object) {
      const frames = selected.frames
      const entries = Object.keys(axes).map((key, index) => [key, vars[index]])

      frames[frameIndex] = {
        ...frames[frameIndex],
        axes: Object.fromEntries(entries)
      }

      updateGlyphFrames(selected.id, frames)
    }
  }, [axes, urlParams, glyphs, updateGlyphFrames])

  // set glyph frame axes
  const setGlyphFrameAxes = useCallback((frameIndex: number, axe: string, value: number) => {
    console.info(urlParams['current'], axe, value)
    if (!urlParams['current']) {
      return 
    }

    const selected = glyphs.find((glyph) => glyph.id === urlParams['current'])

    if (selected) {
      const frames = selected.frames

      frames[frameIndex] = {
        ...frames[frameIndex],
        axes: {
          ...frames[frameIndex].axes,
          [axe]: value
        }
      }

      updateGlyphFrames(selected.id, frames)
    }
  }, [glyphs, updateGlyphFrames, urlParams])

  // set glyph frame position
  const setGlyphFramePosition = useCallback((frameIndex: number, position: [number, number]) => {
    if (current === null) {
      return 
    }

    const selected = glyphs.find((glyph) => glyph.id === current)

    if (selected) {
      const frames = selected.frames

      frames[frameIndex] = {
        ...frames[frameIndex],
        position,
      }

      updateGlyphFrames(selected.id, frames)
    }
  }, [current, glyphs, updateGlyphFrames])

    // set glyph frame properties
  const setGlyphFrameProperties = useCallback((frameIndex: number, properties: ShapeConfig) => {
    if (current === null) {
      return 
    }

    const selected = glyphs.find((glyph) => glyph.id === current)

    if (selected) {
      const frames = selected.frames

      frames[frameIndex] = {
        ...frames[frameIndex],
        properties: {
          ...frames[frameIndex].properties,
          ...properties
        },
      }

      updateGlyphFrames(selected.id, frames)
    }
  }, [current, glyphs, updateGlyphFrames])

  // render
  return (
    <GlyphsContext.Provider
      value={
        useMemo(() => ({
          current,
          glyphs,
          getGlyph,
          setGlyphFramePosition,
          setGlyphFrameProperties,
          getGlyphVariation,
          setCurrent: setCurrentGlyphContexts,
          setGlyphInstance,
          setGlyphFrameAxes,
        }), [
          current,
          glyphs,
          getGlyph,
          setGlyphFramePosition,
          setGlyphFrameProperties,
          getGlyphVariation,
          setCurrentGlyphContexts,
          setGlyphInstance,
          setGlyphFrameAxes,
      ])}
    >
      {children}
    </GlyphsContext.Provider>
  )
}

const UseGlyphsContext = () => {
  const context = useContext(GlyphsContext)

  if (context === undefined) {
    throw new Error(
      'GlyphsContext must be used within a GlyphsProvider'
    )
  }

  return context
}

export { GlyphsContext, GlyphsProvider, UseGlyphsContext }
export default GlyphsProvider
