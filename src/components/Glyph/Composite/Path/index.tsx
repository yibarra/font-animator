import { Group, Path as PathKonva } from 'react-konva'
import { useEffect, useRef } from 'react'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Group as IGroup } from 'konva/lib/Group'
import type { Path as IPathKonva } from 'konva/lib/shapes/Path'

import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import { default as Base } from '../../index'
import { useGlyphsStore } from '../../../../contexts/Glyphs/store'
import { UseGlyphContext } from '../../Context'
import { useMainStore } from '../../../../contexts/Main/store'
import type { IPath } from './interfaces'

const Path = ({
  current,
  currentFrame,
  index,
  rotation,
  setPositionDrag,
  ...props
}: IPath) => {
  const shapeRef = useRef<IPathKonva | null>(null)
  const groupRef = useRef<IGroup | null>(null)
  const { setGlyphRotate, setGlyphPosition } = UseGlyphsContext()
  const { setCurrent } = useGlyphsStore()

  const { data, state, path } = UseGlyphContext()
  const { setIsDragging } = useMainStore()

  const { id, properties } = data
  const { bounding, path: pathSVG, points } = path
  const { metrics, skeleton, baseLines, viewPoints } = state

  const onUpdateMove = (event: KonvaEventObject<DragEvent>) => {
    const node = event.target
    const x = node.x()
    const y = node.y()
    const rotation = node.rotation()

    setPositionDrag([x, y, rotation])
  }
  
  const onUpdateTranslate = (event: KonvaEventObject<DragEvent>) => {
    const node = event.target
    const x = node.x()
    const y = node.y()

    setIsDragging(false)
    setGlyphPosition(id, currentFrame, [x, y])
  }

  const onUpdateTransform = (event: KonvaEventObject<DragEvent>) => {
    const { rotation, x, y } = event.target.attrs

    setIsDragging(false)
    setGlyphRotate(id, currentFrame, [x, y], rotation)
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
      onDragEnd={onUpdateTranslate}
      onDragMove={onUpdateMove}
      onTransform={onUpdateMove}
      onTransformEnd={onUpdateTransform}
    >
      {current && baseLines && (
        <Base.FontMetricsLines
          path={pathSVG}
          fontSize={properties.fontSize}
          rotation={0}
          offsetY={-bounding.y2 / 2 + 70}
          x={0}
          y={0}
          width={(bounding.x2 - bounding.x1) + 40}
        />
      )}
      
      <PathKonva
        {...properties}
        data={pathSVG}
        offsetY={bounding.y2 / 2 - 70}
        opacity={skeleton ? 0 : 1}
        ref={shapeRef}
        scaleY={-1}
        shadowColor="#0f1d44"
        shadowOffset={{ x: 0, y: -4 }}
        shadowBlur={4}
        shadowOpacity={current ? 0 : 0.4}
        shadowEnabled
      />

      {skeleton && (
        <>
          <Base.Skeleton
            offsetY={bounding.y2 / 2 - 70}
            points={points}
          />

          <Base.Points
            offsetY={bounding.y2 / 2 - 70}
            points={points}
            viewPoints={viewPoints}
          />

          <Base.ArrowsPoint
            count={16}
            offsetY={bounding.y2 / 2 - 70}
          />
        </>
      )}

      {current && metrics && (
        <>
          <Base.Bounding
            arrowHeight={4}
            arrowWidth={6}
            fill="#e3e9f9"
            stroke="#e3e9f9"
            strokeWidth={0.5}
            offsetY={-bounding.y2 / 2 + 40}
          />

          <Base.Bounding
            arrowHeight={4}
            arrowWidth={6}
            fill="#e3e9f9"
            stroke="#e3e9f9"
            strokeWidth={0.5}
            offsetX={40}
            offsetY={-bounding.y2 / 2 + 70}
            vertical
          />
      </>
    )}
    </Group> 
  )
}

Path.displayName = 'Glyph.Path'
export default Path
