import { Path as PathKonva, Shape } from 'react-konva'

import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import type { IPath } from './interfaces'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Context } from 'konva/lib/Context'
import type { Shape as IShape } from 'konva/lib/Shape'

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

  const { bounding, path } = getPathDataGlyph(
    charIndex,
    numericAxes,
    140
  )

  const drawBox = (ctx: Context, shape: IShape) => {
    ctx.beginPath()
    ctx.moveTo(bounding.x1, bounding.y1)
    ctx.lineTo(bounding.x2, bounding.y1)
    ctx.moveTo(bounding.x1, bounding.y1)
    ctx.lineTo(bounding.x1, bounding.y2)
    ctx.strokeShape(shape)
  }
  
  const onUpdateTranslate = (event: KonvaEventObject<DragEvent>) => {
    const node = event.target
    const x = node.x()
    const y = node.y()

    setGlyphPosition(id, 0, [x, y])
  }

  const onUpdateTransform = (event: KonvaEventObject<DragEvent>) => {
    const { rotation } = event.target.attrs

    setGlyphRotate(id, 0, rotation)
  }

  console.info(bounding, '------')

  return (
    <>
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
        y={position[1]}
        scaleY={-1}
      />

      <Shape
        sceneFunc={drawBox}
        stroke="#FFF"
        strokeWidth={0.5}
        x={position[0]}
        y={position[1]}
      />
    </>
  )
}

Path.displayName = 'Glyph.Path'
export default Path
