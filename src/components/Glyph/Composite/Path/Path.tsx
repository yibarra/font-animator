import { Group, Path as PathKonva, Shape } from 'react-konva'

import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import type { IPath } from './interfaces'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Context } from 'konva/lib/Context'
import type { Shape as IShape } from 'konva/lib/Shape'
import Progress from '../Progress'
import { useState } from 'react'

const Path = ({
  charIndex,
  current,
  id,
  index,
  axes,
  shapeRef,
  rotation,
  position,
  properties
}: IPath) => {
  const [isDragging, setIsDragging] = useState(false)
  const [positionDrag, setPositionDrag] = useState<[number, number, number]>([...position, rotation])

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

  const arrowWidth = 4
  const arrowHeight = 6

  const drawText = (ctx: Context, text: string, x: number, y: number, rotate = false) => {
    const { width } = ctx.measureText(text)

    ctx.font = '10px Roboto Mono'
    ctx.fillStyle = '#e3e9f9'

    if (rotate) {
      ctx.save()
  
      ctx.translate(x, y + width / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.fillText(text, 0, 0)
  
      ctx.restore()
    } else {
      ctx.fillText(text, (x - width) / 2, (y / 2))
    }
  }

  const drawBox = (ctx: Context, shape: IShape) => {
    ctx.beginPath()

    const { x1, x2, y1 } = bounding

    ctx.moveTo(x1, y1)
    ctx.lineTo(x1 + arrowHeight, y1 - arrowWidth / 2)
    ctx.lineTo(x1 + arrowHeight, y1 + arrowWidth / 2)
    ctx.closePath()

    ctx.lineTo(x2, y1)

    ctx.lineTo(x2 - arrowHeight, y1 - arrowWidth / 2)
    ctx.lineTo(x2 - arrowHeight, y1 + arrowWidth / 2)
    ctx.lineTo(x2, y1)
    ctx.closePath()

    ctx.moveTo(x1, y1 - arrowWidth * 2 - arrowHeight)
    ctx.lineTo(x1, y1 + arrowWidth * 2 + arrowHeight)
    ctx.closePath()

    ctx.moveTo(x2, y1 - arrowWidth * 2 - arrowHeight)
    ctx.lineTo(x2, y1 + arrowWidth * 2 + arrowHeight)
    ctx.closePath()

    drawText(ctx, `${Math.round(x2 - x1)}px`, x2 - x1, y1 + 40)

    ctx.fillShape(shape)
    ctx.strokeShape(shape)
  }

  const drawVerticalBox = (ctx: Context, shape: IShape) => {
    ctx.beginPath()

    const { x1, y1, y2 } = bounding

    ctx.moveTo(x1, y1)
    ctx.lineTo(x1 + arrowWidth / 2, y1 - arrowHeight)
    ctx.lineTo(x1 - arrowWidth / 2, y1 - arrowHeight)
    ctx.closePath()

    ctx.moveTo(x1, y1)
    ctx.lineTo(x1, y2)
    ctx.closePath()

    ctx.moveTo(x1, y2)
    ctx.lineTo(x1 + arrowWidth / 2, y2 + arrowHeight)
    ctx.lineTo(x1 - arrowWidth / 2, y2 + arrowHeight)
    ctx.closePath()

    ctx.moveTo(x1 - arrowWidth * 2 - arrowHeight, y1)
    ctx.lineTo(x1 + arrowWidth * 2 + arrowHeight, y1)
    ctx.closePath()

    ctx.moveTo(x1- arrowWidth * 2 - arrowHeight, y2)
    ctx.lineTo(x1 + arrowWidth * 2 + arrowHeight, y2)
    ctx.closePath()

    drawText(ctx, `${Math.round(y1 - y2)}px`, x1 - 10, y2 / 2, true)

    ctx.fillShape(shape)
    ctx.strokeShape(shape)
  }
  
  const onUpdateTranslate = (event: KonvaEventObject<DragEvent>) => {
    const node = event.target
    const x = node.x()
    const y = node.y()

    setIsDragging(false)
    setGlyphPosition(id, 0, [x, y])
  }

  const onUpdateTransform = (event: KonvaEventObject<DragEvent>) => {
    const { rotation, x, y } = event.target.attrs

    setIsDragging(false)
    setGlyphRotate(id, 0, [x, y], rotation)
  }

  return (
    <>
      <PathKonva
        {...properties}
        data={path}
        draggable
        onClick={() => setCurrent(current ? null : index)}
        onDragStart={() => setIsDragging(true)}
        onTransformStart={() => setIsDragging(true)}
        onDragMove={(event) => {
          const node = event.target
          const x = node.x()
          const y = node.y()
          const rotation = node.rotation()

          setPositionDrag([x, y, rotation])
        }}
        onDragEnd={onUpdateTranslate}
        onTransform={(event) => {
          const node = event.target
          const x = node.x()
          const y = node.y()
          const rotation = node.rotation()

          setPositionDrag([x, y, rotation])
        }}
        onTransformEnd={onUpdateTransform}
        ref={shapeRef}
        rotation={rotation}
        x={position[0]}
        y={position[1]}
        scaleY={-1}
      />

      {current && (
        <Group
          rotation={isDragging ? positionDrag[2] : rotation}
          x={isDragging ? positionDrag[0] : position[0]}
          y={isDragging ? positionDrag[1] : position[1]}
        >
          <Progress.Border
            radius={8}
            rotation={isDragging ? positionDrag[2] : rotation}
            x={(bounding.x2 - bounding.x1) / 2}
            y={(bounding.y2) - 24}
          />

          <Shape
            sceneFunc={drawBox}
            stroke="#e3e9f9"
            strokeWidth={0.5}
            fill="#e3e9f9"
            offsetY={-20}
          />

          <Shape
            sceneFunc={drawVerticalBox}
            stroke="#e3e9f9"
            strokeWidth={0.5}
            fill="#e3e9f9"
            offsetX={20}
          />
        </Group>
      )}
    </>
  )
}

Path.displayName = 'Glyph.Path'
export default Path
