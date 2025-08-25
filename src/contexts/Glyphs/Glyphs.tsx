import { createContext, useCallback, useContext, useMemo } from 'react'

import { useGlyphsStore } from './store'
import { useFontStore } from '../Font/store'
import { UseFontSettingsContext } from '../FontSettings/FontSettings'
import type { IFrame, IGlyphsContext, IGlyphsProvider } from './interfaces'
import { percentToRange } from './utils'

// glyph context
const GlyphsContext = createContext({} as IGlyphsContext)

// glyph provider
const GlyphsProvider = ({ children }: IGlyphsProvider) => {
  const { font } = useFontStore()
  const { axes } = UseFontSettingsContext()

  const { glyphs, updateGlyphs } = useGlyphsStore()

  // get glyph
  const getGlyph = useCallback((index: number) => font?.getGlyph(index), [font])

  // get glyph variation
  const getGlyphVariation = useCallback((index: number, coords: number[]) => {
    if (!font) {
      return
    }

    const fontInstance = font.getVariation(coords)

    return fontInstance.getGlyph(index)
  }, [font])

  // set glyph instance
  const setGlyphInstance = useCallback((id: string, frame: number, coords: number[]) => {
    if (!(axes instanceof Object)) {
      return
    }

    const entries = Object.keys(axes).map((key, index) => [key, coords[index]])
    const newAxes = Object.fromEntries(entries)

    updateGlyphs(
      glyphs.map((g) => {
        if (g.id !== id) {
          return g
        }

        const frames = [...g.frames]

        if (!frames[frame]) {
          return g // defend: no update if frame doesn't exist
        }

        frames[frame] = {
          ...frames[frame],
          axes: newAxes,
        }

        return {
          ...g,
          frames,
          axes: newAxes
        }
      })
    )
  }, [axes, glyphs, updateGlyphs])

  // set glyph frame axes
  const setGlyphFrameAxes = useCallback((id: string, frame: number, axes: Record<string, number>) => {
    updateGlyphs(
      glyphs.map((g) => {
        if (g.id !== id) {
          return g
        }

        const frames = [...g.frames]

        if (!frames[frame]) {
          return g // defend: no update if frame doesn't exist
        }

        frames[frame] = {
          ...frames[frame],
          axes,
        }

        return {
          ...g,
          axes,
          frames,
        }
      })
    )
  }, [glyphs, updateGlyphs])

  // animations axes, re-factory and performance
  const setGlyphFramesAxesAnimation = useCallback((percent: number) => {
    const axesUpdate: { axes: IFrame['axes'], position: [number, number], rotate: number }[] = []

    glyphs.forEach((value) => {
      if (value) {
        const [frameInit, frameEnd] = value.frames

        const coordInit = Object.values(frameInit.axes)
        const coordEnd = Object.values(frameEnd.axes)

        // const wdth = percentToRange(percent, Number(coordInit[0]), Number(coordEnd[0]))
        const wght = percentToRange(percent, Number(coordInit[0]), Number(coordEnd[0]))

        const x = percentToRange(percent, frameInit.position[0], frameEnd.position[0])
        const y = percentToRange(percent, frameInit.position[1], frameEnd.position[1])

        const rotate = percentToRange(percent, frameInit.rotation, frameEnd.rotation)

        axesUpdate.push({ rotate, axes: { wght }, position: [x, y] })
      }
    })

    const update = glyphs.map((glyph, i) => ({
      ...glyph,
      axes: axesUpdate[i]?.axes ?? glyph.axes,
      position: axesUpdate[i]?.position ?? glyph.position,
      rotation: axesUpdate[i]?.rotate ?? glyph.rotation,
    }))

    updateGlyphs(update)
  }, [glyphs, updateGlyphs])

  // set glyph frame rotate
  const setGlyphRotate = useCallback((id: string, frame: number, position: [number, number], rotation: number) => {
    updateGlyphs(
      glyphs.map((glyph) => {
        if (glyph.id !== id) {
          return glyph
        }

        const frames = [...glyph.frames]

        if (!frames[frame]) {
          return glyph // defend: don't modify frame is not exists
        }

        frames[frame] = {
          ...frames[frame],
          rotation,
          position,
        }

        return {
          ...glyph,
          frames,
          rotation,
          position,
        }
      })
    )
  }, [glyphs, updateGlyphs])

  // set glyph frame position
  const setGlyphPosition = useCallback((id: string, frame: number, position: [number, number]) => {
    updateGlyphs(
      glyphs.map((glyph) => {
        if (glyph.id !== id) {
          return glyph
        }

        const frames = [...glyph.frames]

        frames[frame] = {
          ...frames[frame],
          position,
        }

        return { ...glyph, frames, position }
      })
    )
  }, [glyphs, updateGlyphs])

  // render
  return (
    <GlyphsContext.Provider
      value={
        useMemo(() => ({
          getGlyph,
          setGlyphPosition,
          setGlyphRotate,
          getGlyphVariation,
          setGlyphInstance,
          setGlyphFrameAxes,
          setGlyphFramesAxesAnimation,
        }), [
          getGlyph,
          setGlyphPosition,
          setGlyphRotate,
          getGlyphVariation,
          setGlyphInstance,
          setGlyphFrameAxes,
          setGlyphFramesAxesAnimation,
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
