import { Path as PathKonva } from 'react-konva'

import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import type { IPath } from './interfaces'
import type { KonvaEventObject } from 'konva/lib/Node'

const Path = ({
  charIndex,
  id,
  axes,
  shapeRef,
  properties
}: IPath) => {
  const { getPathDataGlyph } = UseFontSettingsContext()
  const { setCurrent, setGlyphPosition } = UseGlyphsContext()

  const numericAxes = Object.fromEntries(
    Object.entries(axes).map(([key, value]) => [key, Number(value)])
  )

  const path = getPathDataGlyph(
    charIndex,
    numericAxes,
    140
  )
  
  const onUpdateTransform = (event: KonvaEventObject<DragEvent>) => {
    const { x, y, rotation } = event.target.attrs
    
    console.info('onUpdateTransform', x, y, rotation)
    setGlyphPosition([x, y])
  }

  return (
    <PathKonva
      {...properties}
      draggable
      data={path}
      onClick={() => setCurrent(id)}
      ref={shapeRef}
      onTransformEnd={onUpdateTransform}
    />
  )
}

Path.displayName = 'Glyph.Path'
export default Path
