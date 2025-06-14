import { createContext, useCallback, useContext, useMemo } from 'react'

import { useGlyphsStore } from './store'
import { UseLoadFontContext } from '../LoadFont/LoadFont'
import { UseFontSettingsContext } from '../FontSettings/FontSettings'
import type { IGlyphsContext, IGlyphsProvider } from './interfaces'

// glyph context
const GlyphsContext = createContext({} as IGlyphsContext)

// glyph provider
const GlyphsProvider = ({ children }: IGlyphsProvider) => {
  const { font } = UseLoadFontContext()
  const { axes } = UseFontSettingsContext()

  const store = useGlyphsStore()

  const { current, glyphs, setCurrent, updateGlyphFrames } = store

  // get glyph
  const getGlyph = useCallback((index: number) => font?.getGlyph(index), [font])

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
    if (current === null) {
      return 
    }

    const selected = glyphs.find((glyph) => glyph.id === current)

    if (selected && axes instanceof Object) {
      const frames = selected.frames
      const entries = Object.keys(axes).map((key, index) => [key, vars[index]])

      frames[frameIndex] = {
        ...frames[frameIndex],
        axes: Object.fromEntries(entries)
      }

      updateGlyphFrames(selected.id, frames)
    }
  }, [axes, current, glyphs, updateGlyphFrames])

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

  // render
  return (
    <GlyphsContext.Provider
      value={
        useMemo(() => ({
          current,
          glyphs,
          getGlyph,
          setGlyphFramePosition,
          getGlyphVariation,
          setCurrent,
          setGlyphInstance,
        }), [
          current,
          glyphs,
          getGlyph,
          setGlyphFramePosition,
          getGlyphVariation,
          setCurrent,
          setGlyphInstance,
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
