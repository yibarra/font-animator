import { useState, createContext, useContext, useMemo, useCallback, useRef, useEffect } from 'react'
import type { Group } from 'konva/lib/Group'
import type { Path } from 'konva/lib/shapes/Path'

import { useFontStore } from '../../contexts/Font/store'
import { extractGlyphArrows, pathToSvg } from '../../contexts/FontSettings/utils'
import type { GlyphContextProps, IGlyphProviderProps, IViewOptions } from './interfaces'
import type { IDataGlyphCommand } from '../../contexts/FontSettings/interfaces'

const GlyphContext = createContext<GlyphContextProps | undefined>(undefined)

const GlyphProvider = ({ children, data, ...props }: IGlyphProviderProps) => {
  const { charIndex, axes, properties: { fontSize } } = data

  const [state, setState] = useState<IViewOptions>({
    currentFrame: 0,
    metrics: true,
    skeleton: true,
    viewPoints: true,
    viewCommands: true,
  })

  const [commands, setCommands] = useState<IDataGlyphCommand["commands"]>([])

  const { font } = useFontStore()

  const groupRef = useRef<Group | null>(null)
  const shapeRef = useRef<Path | null>(null)

  const factor = useMemo(() => {
    if (!font) {
      return {
        scaleFactor: 0,
        ascender: 0,
        baseLine: 0,
        capHeight: 0,
        descender: 0,
        xHeight: 0,
      }
    }

    const scaleFactor = fontSize / (font?.unitsPerEm || 0)

    return {
      scaleFactor,
      ascender: -font.ascent * scaleFactor,
      baseLine: 0,
      capHeight: -font.capHeight * scaleFactor,
      descender: font?.descent * scaleFactor,
      xHeight: -font.xHeight * scaleFactor,
    }
  }, [fontSize, font])

  // get path data - remove
  const getPathData = useMemo((): IDataGlyphCommand => {
    const coords = Object.fromEntries(
      Object.entries(axes).map(([key, value]) => [key, Number(value)])
    )

    if (!font || !charIndex) {
      return {
        arrows: [],
        commands: [],
        bounding: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0
        },
        height: 0,
        isLigature: false,
        isMark: false,
        name: '',
        path: '',
        width: 0,
      }
    }
    
    const fontInstance = font.getVariation(coords)
    const glyph = fontInstance.getGlyph(charIndex)
    const units = fontInstance.unitsPerEm || 1000
    
    if (glyph) {
      const glyphScale = glyph.path.scale(fontSize / units)

      const { name, isLigature, isMark } = glyph
      const { bbox } = glyphScale
      
      const bounding = {
        x1: bbox.minX,
        y1: bbox.minY * -1,
        x2: bbox.maxX,
        y2: bbox.maxY * -1,
      }

      return {
        arrows: extractGlyphArrows(commands) ?? [],
        bounding,
        commands,
        height: bbox.height,
        isLigature,
        isMark,
        name,
        path: pathToSvg(commands),
        width: bbox.width
      }
    }

    return {
      arrows: [],
      bounding: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      },
      commands: [],
      height: 0,
      isLigature: false,
      isMark: false,
      name: '',
      path: '',
      width: 0,
    }
  }, [axes, charIndex, commands, fontSize, font])

  // update commands
  const updateCommand = useCallback(
    (index: number, newCommand: Partial<IDataGlyphCommand['commands'][number]>) => {
      setCommands((prev) =>
        prev.map((cmd, i) => (i === index ? { ...cmd, ...newCommand } : cmd))
      )
    },
    []
  )

  // updata state
  const updateState = useCallback((key: string, value: boolean) => (
    setState((prev) => ({
      ...prev,
      [key]: value,
    }))
  ), [])

  // init
  useEffect(() => {
    const coords = Object.fromEntries(
      Object.entries(axes).map(([key, value]) => [key, Number(value)])
    )

    const fontInstance = font?.getVariation(coords)
    const glyph = fontInstance?.getGlyph(charIndex)
    const units = fontInstance?.unitsPerEm || 1000

    if (glyph) {
      const glyphScale = glyph.path.scale(fontSize / units)

      setCommands(glyphScale.commands)
    }
  }, [axes, charIndex, fontSize, font])

  return (
    <GlyphContext.Provider
      value={
        useMemo(() => ({
          ...props,
          data,
          groupRef,
          shapeRef,
          path: getPathData,
          factor,
          state,
          setState,
          updateCommand,
          updateState,
        }), [
          props,
          data,
          groupRef,
          shapeRef,
          getPathData,
          factor,
          state,
          setState,
          updateCommand,
          updateState
        ])
      }
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