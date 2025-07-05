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
  rotation,
  position,
  properties
}: IPath) => {
  const { getPathDataGlyph } = UseFontSettingsContext()
  const { setCurrent, setGlyphRotate, setGlyphPosition } = UseGlyphsContext()

  const numericAxes = Object.fromEntries(
    Object.entries(axes).map(([key, value]) => [key, Number(value)])
  )

  const path = getPathDataGlyph(
    charIndex,
    numericAxes,
    140
  )
  
  const onUpdateTranslate = (event: KonvaEventObject<DragEvent>) => {
    const node = event.target
    const x = node.x()
    const y = node.y()

    setGlyphPosition(id, 0, [x, y])
  }

  const onUpdateTransform = (event: KonvaEventObject<DragEvent>) => {
    const node = event.target
    const rotation = node.rotation()

    console.info(node.x(), node.y(), rotation)
    setGlyphRotate(id, 0, rotation)
  }

  return (
    <PathKonva
      {...properties}
      draggable
      data={path}
      onClick={() => setCurrent(id)}
      ref={shapeRef}
      onDragEnd={onUpdateTranslate}
      onTransformEnd={onUpdateTransform}
      rotation={rotation}
      x={position[0]}
      y={position[1]}
    />
  )
}

Path.displayName = 'Glyph.Path'
export default Path
