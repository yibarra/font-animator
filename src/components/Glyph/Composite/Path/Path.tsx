import { Group, Path as PathKonva } from 'react-konva'
import { useEffect, useRef } from 'react'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Group as IGroup } from 'konva/lib/Group'

import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import { default as Base } from '../../index'
import type { IPath } from './interfaces'

const Path = ({
  charIndex,
  current,
  id,
  index,
  axes,
  skeleton,
  shapeRef,
  rotation,
  properties,
  setIsDragging,
  setPositionDrag,
  ...props
}: IPath) => {
  const groupRef = useRef<IGroup | null>(null)

  const { getPathDataGlyph } = UseFontSettingsContext()
  const { setCurrent, setGlyphRotate, setGlyphPosition } = UseGlyphsContext()

  const numericAxes = Object.fromEntries(
    Object.entries(axes).map(([key, value]) => [key, Number(value)])
  )

  const { arrows, bounding, path, points } = getPathDataGlyph(
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

  useEffect(() => {
    if (groupRef.current && bounding) {
      const shape = groupRef.current

      const width = bounding.x2 - bounding.x1
      const height = bounding.y2 - bounding.y1

      const centerX = bounding.x1 + width / 2
      const centerY = bounding.y1 + height / 2

      shape.offsetX(centerX)
      shape.offsetY(centerY)
      
      shape.getLayer()?.batchDraw()
    }
  }, [bounding])

  return (
    <Group
      {...props}
      draggable
      ref={groupRef}
      rotation={rotation}
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
    >
      <Base.FontMetricsLines
        path={path}
        fontSize={properties.fontSize}
        rotation={0}
        x={0}
        y={0}
        width={(bounding.x2 - bounding.x1) + 40}
      />
      
      <PathKonva
        {...properties}
        data={path}
        ref={shapeRef}
        scaleY={-1}
        shadowColor="#0f1d44"
        shadowOffset={{ x: 0, y: -4 }}
        shadowBlur={4}
        shadowOpacity={0.4}
        shadowEnabled
        opacity={skeleton ? 0 : 1}
      />

      {skeleton && (
        <>
          <Base.Skeleton points={points} />
          <Base.Points points={points} />
          <Base.ArrowsPoint arrows={arrows} />
        </>
      )}

      <Base.Bounding
        arrowHeight={4}
        arrowWidth={6}
        bounding={bounding}
        properties={{
          fill: '#e3e9f9',
          stroke: '#e3e9f9',
          strokeWidth: 0.5,
          offsetY: -40,
        }}
      />

      <Base.Bounding
        arrowHeight={4}
        arrowWidth={6}
        bounding={bounding}
        properties={{
          fill: '#e3e9f9',
          stroke: '#e3e9f9',
          strokeWidth: 0.5,
          offsetX: 40,
        }}
        vertical
      />
    </Group>
  )
}

Path.displayName = 'Glyph.Path'
export default Path
