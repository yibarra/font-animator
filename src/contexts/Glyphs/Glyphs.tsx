import { createContext, useCallback, useContext, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ShapeConfig } from 'konva/lib/Shape'

import { useGlyphsStore } from './store'
import { UseFontContext } from '../Font/Font'
import { UseFontSettingsContext } from '../FontSettings/FontSettings'
import type { IFrame, IGlyphsContext, IGlyphsProvider } from './interfaces'
import { getUrlParam, percentToRange } from './utils'

// glyph context
const GlyphsContext = createContext({} as IGlyphsContext)

// glyph provider
const GlyphsProvider = ({ children }: IGlyphsProvider) => {
  const { font } = UseFontContext()
  const { axes } = UseFontSettingsContext()
  const [, setSearchParams] = useSearchParams()

  const { glyphs, updateGlyphs, updateGlyphFrames, updateGlyph, ...props } = useGlyphsStore()

  // get glyph
  const getGlyph = useCallback((index: number) => font?.getGlyph(index), [font])

  // get current glyph updata
  const getCurrentGlyph = useCallback(() => {
    const id = getUrlParam('glyph')

    if (!id) {
      return 
    }

    return glyphs.find((glyph) => glyph.id === id)
  }, [glyphs])

  // set current glyph contexts
  const setCurrentGlyphContexts = useCallback((id: string | null) => {
    console.info(id)
    const newParams = new URLSearchParams(window.location.search)

    if (id) {
      newParams.set('glyph', String(id))
      newParams.set('frame', '0')
    } else {
      newParams.delete('glyph')
      newParams.delete('frame')
    }
    
    setSearchParams(newParams, { replace: true })
  }, [setSearchParams])

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
    const frame = getUrlParam('frame')

    if (glyph && axes instanceof Object) {
      const frames = [...glyph.frames]
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
    const frame = getUrlParam('frame')
    
    if (glyph) {
      const frames = [...glyph.frames]
      const frameIndex = Number.isInteger(Number(frame)) ? Number(frame) : 0
      const frameUpdate = frames[frameIndex]

      frames[frameIndex] = {
        ...frameUpdate,
        axes: {
          ...frameUpdate.axes,
          [axe]: value
        },
      }

      updateGlyphFrames(glyph.id, frames)
    }
  }, [getCurrentGlyph, updateGlyphFrames])

  // animations axes, re-factory and performance
  const setGlyphFramesAxesAnimation = useCallback((percent: number) => {
    const axesUpdate: { axes: IFrame['axes'], position: [number, number], rotate: number }[] = []

    glyphs.forEach((value) => {
      if (value) {
        const [frameInit, frameEnd] = value.frames

        const coordInit = Object.values(frameInit.axes)
        const coordEnd = Object.values(frameEnd.axes)

        const wdth = percentToRange(percent, Number(coordInit[0]), Number(coordEnd[0]))
        const wght = percentToRange(percent, Number(coordInit[1]), Number(coordEnd[1]))

        const x = percentToRange(percent, frameInit.position[0], frameEnd.position[0])
        const y = percentToRange(percent, frameInit.position[1], frameEnd.position[1])

        const rotate = percentToRange(percent, frameInit.rotation, frameEnd.rotation)

        axesUpdate.push({ rotate, axes: { wdth, wght }, position: [x, y] })
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
        if (glyph.id !== id) return glyph

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
          ...props,
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
          props,
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
