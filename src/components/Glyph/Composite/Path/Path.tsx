import { Group, Path as PathKonva } from 'react-konva'

import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import type { IPath } from './interfaces'
import type { KonvaEventObject } from 'konva/lib/Node'
import Progress from '../Progress'
import { useState } from 'react'
import Bounding from '../Bounding'

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
    properties.fontSize ?? 12
  )
  
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

        shadowColor="#0f1d44"
        shadowOffset={{ x: 0, y: -4 }}
        shadowBlur={6}
        shadowOpacity={0.3}
        shadowEnabled 
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
            x={(bounding.x2 - bounding.x1) / 2 + 8}
            y={(bounding.y2 - 24)}
          />

          <Bounding
            arrowHeight={4}
            arrowWidth={6}
            bounding={bounding}
            properties={{
              fill: '#e3e9f9',
              stroke: '#e3e9f9',
              strokeWidth: 0.5,
              offsetY: -20,
            }}
          />

          <Bounding
            arrowHeight={4}
            arrowWidth={6}
            bounding={bounding}
            properties={{
              fill: '#e3e9f9',
              stroke: '#e3e9f9',
              strokeWidth: 0.5,
              offsetX: 20,
            }}
            vertical
          />
        </Group>
      )}
    </>
  )
}

Path.displayName = 'Glyph.Path'
export default Path
