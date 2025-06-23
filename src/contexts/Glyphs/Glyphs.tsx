import { createContext, useCallback, useContext, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ShapeConfig } from 'konva/lib/Shape'

import { useGlyphsStore } from './store'
import { UseFontContext } from '../Font/Font'
import { UseFontSettingsContext } from '../FontSettings/FontSettings'
import type { IFrame, IGlyph, IGlyphsContext, IGlyphsProvider } from './interfaces'
import { getUrlParam, percentToRange } from './utils'

// glyph context
const GlyphsContext = createContext({} as IGlyphsContext)

// glyph provider
const GlyphsProvider = ({ children }: IGlyphsProvider) => {
  const { font } = UseFontContext()
  const { axes } = UseFontSettingsContext()
  const [, setSearchParams] = useSearchParams()

  const { current, glyphs, setCurrent, updateGlyphs, updateGlyphFrames, updateGlyph } = useGlyphsStore()

  // get glyph
  const getGlyph = useCallback((index: number) => font?.getGlyph(index), [font])

  // get current glyph updata
  const getCurrentGlyph = useCallback(() => {
    const id = getUrlParam('current')

    if (!id) {
      return 
    }

    return glyphs.find((glyph) => glyph.id === id)
  }, [glyphs])

  // set current glyph contexts
  const setCurrentGlyphContexts = useCallback((glyph: IGlyph | null) => {
    const newParams = new URLSearchParams(window.location.search)

    if (glyph) {
      newParams.set('current', String(glyph.id))
    } else {
      newParams.delete('current')
    }
    
    setSearchParams(newParams, { replace: true })
    setCurrent(glyph)
  }, [setCurrent, setSearchParams])

  // get glyph variation
  const getGlyphVariation = useCallback((index: number, variations: number[]) => {
    if (!font) {
      return
    }

    const fontInstance = font.getVariation(variations)

    return fontInstance.getGlyph(index)
  }, [font])

  // set glyph instance
  const setGlyphInstance = useCallback((vars: number[]) => {
    const glyph = getCurrentGlyph()
    const frame = getUrlParam('currentFrame')

    if (glyph && axes instanceof Object) {
      const frames = glyph.frames
      const entries = Object.keys(axes).map((key, index) => [key, vars[index]])
      const frameIndex = Number.isInteger(Number(frame)) ? Number(frame) : 0

      frames[frameIndex] = {
        ...frames[frameIndex],
        axes: Object.fromEntries(entries)
      }

      updateGlyphFrames(glyph.id, frames)
    }
  }, [axes, getCurrentGlyph, updateGlyphFrames])

  // set glyph frame axes
  const setGlyphFrameAxes = useCallback((axe: string, value: number) => {
    const glyph = getCurrentGlyph()
    const frame = getUrlParam('currentFrame')
    
    if (glyph) {
      const frames = glyph.frames
      const frameIndex = Number.isInteger(Number(frame)) ? Number(frame) : 0
      const frameUpdate = frames[frameIndex]

      frames[frameIndex] = {
        ...frameUpdate,
        axes: {
          ...frameUpdate.axes,
          [axe]: value
        }
      }

      updateGlyphFrames(glyph.id, frames)
    }
  }, [getCurrentGlyph, updateGlyphFrames])

  // animations axes, re-factory and performance
  const setGlyphFramesAxesAnimation = useCallback((percent: number) => {
    const axesUpdate: { axes: IFrame['axes'], position: [number, number], rotate: number }[] = []

    for (const [, value] of glyphs.entries()) {
      if (value) {
        const [frameInit, frameEnd] = value.frames

        const coordInit = Object.values(frameInit.axes)
        const coordEnd = Object.values(frameEnd.axes)

        const wdth = percentToRange(percent, Number(coordInit[0]), Number(coordEnd[0]))
        const wght = percentToRange(percent, Number(coordInit[1]), Number(coordEnd[1]))

        const x = percentToRange(percent, frameInit.position[0], frameEnd.position[0])
        const y = percentToRange(percent, frameInit.position[1], frameEnd.position[1])

        const rotate = percentToRange(percent, frameInit.rotate, frameEnd.rotate)

        axesUpdate.push({ rotate, axes: { wdth, wght }, position: [x, y] })
      }
    }

    const update = glyphs.map((e, i) => ({ ...e, ...axesUpdate[i] }))
    updateGlyphs(update)
  }, [glyphs, updateGlyphs])

  // set glyph frame rotate
  const setGlyphRotate = useCallback((rotate: number) => {
    const glyph = getCurrentGlyph()
    const frame = getUrlParam('currentFrame')

    if (glyph) {
      const frames = glyph.frames
      const frameIndex = Number.isInteger(Number(frame)) ? Number(frame) : 0
      const frameUpdate = frames[frameIndex]

      frames[frameIndex] = {
        ...frameUpdate,
        rotate,
      }

      // updateGlyphFrames(glyph.id, frames)
    }
  }, [getCurrentGlyph, updateGlyphFrames])

  // set glyph frame position
  const setGlyphPosition = useCallback((position: [number, number]) => {
    const glyph = getCurrentGlyph()
    const frame = getUrlParam('currentFrame')

    if (glyph) {
      const frames = glyph.frames
      const frameIndex = Number.isInteger(Number(frame)) ? Number(frame) : 0
      const frameUpdate = frames[frameIndex]

      frames[frameIndex] = {
        ...frameUpdate,
        position,
      }

      updateGlyphFrames(glyph.id, frames)
    }
  }, [getCurrentGlyph, updateGlyphFrames])

    // set glyph frame properties
  const setGlyphProperties = useCallback((properties: ShapeConfig) => {
    const glyph = getCurrentGlyph()

    if (glyph) {
      const propsGlyph = {
        ...glyph.properties,
        ...properties
      }

      updateGlyph(glyph.id, { ...glyph, properties: propsGlyph })
    }
  }, [getCurrentGlyph, updateGlyph])

  // render
  return (
    <GlyphsContext.Provider
      value={
        useMemo(() => ({
          current,
          glyphs,
          getGlyph,
          setGlyphPosition,
          setGlyphProperties,
          setGlyphRotate,
          getGlyphVariation,
          setCurrent: setCurrentGlyphContexts,
          setGlyphInstance,
          setGlyphFrameAxes,
          setGlyphFramesAxesAnimation,
        }), [
          current,
          glyphs,
          getGlyph,
          setGlyphPosition,
          setGlyphProperties,
          setGlyphRotate,
          getGlyphVariation,
          setCurrentGlyphContexts,
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
