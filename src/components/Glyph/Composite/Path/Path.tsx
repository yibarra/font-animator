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
    const { rotation, x, y } = event.target.attrs

    console.info(rotation)
    setGlyphRotate(id, 0, [x, y], rotation)
  }

  return (
    <PathKonva
      {...properties}
      data={path}
      draggable
      onClick={() => setCurrent(id)}
      onDragEnd={onUpdateTranslate}
      onTransformEnd={onUpdateTransform}
      ref={shapeRef}
      rotation={rotation}
      x={position[0]}
      y={position[1]}scaleY={-1}
    />
  )
}

Path.displayName = 'Glyph.Path'
export default Path
