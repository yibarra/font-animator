import { useRef } from 'react'
import { Circle } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import Progress from '../Progress'
import { UseGlyphsContext } from '../../../../contexts/Glyphs'
import { UseGlyphContext } from '../../Context'
import { useMainStore } from '../../../../contexts/Main/store'
import type { IRotationProps } from './interfaces'

const Rotation = ({
  outerCircleRadius = 10,
  innerCircleRadius = 10,
  setPositionDrag,
  rotation,
  x = 20,
  y = 20
}: IRotationProps) => {
  const shapeRef = useRef(null)

  const { isDragging, isRotation, setIsDragging, setIsRotation } = useMainStore()
  const { setGlyphRotate } = UseGlyphsContext()
  const {
    data: {
      id,
      position
    },
    state: {
      currentFrame,
    },
  } = UseGlyphContext()

  const handleDragMove = (event: KonvaEventObject<DragEvent>) => {
    const node = event.target
    const pos = node.position()

    const distance = Math.sqrt(
      Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
    )

    const maxDistance = outerCircleRadius - innerCircleRadius

    if (distance > maxDistance) {
      const angle = Math.atan2(pos.y - y, pos.x - x)

      node.x((x) + maxDistance * Math.cos(angle))
      node.y((y) + maxDistance * Math.sin(angle))

      const adjustedAngle = angle + Math.PI / 2
      const normalizedAngle = (adjustedAngle + 2 * Math.PI) % (2 * Math.PI)

      setPositionDrag((prev) => [prev[0], prev[1], normalizedAngle * (180 / Math.PI)])
    }
  }

  if (isDragging && !isRotation) {
    return <></>
  }

  return (
    <>
      <Progress.Border
        radius={outerCircleRadius}
        rotation={-rotation}
        x={x}
        y={y}
      />

      <Circle
        draggable
        fill="red"
        ref={shapeRef}
        onDragStart={() => {
          setIsRotation(true)
          setIsDragging(true)
        }}
        onDragMove={handleDragMove}
        onDragEnd={() => {
          setIsRotation(false)
          setIsDragging(false)

          setGlyphRotate(id, currentFrame, position, rotation)
        }}
        radius={innerCircleRadius - 6}
        x={x}
        y={y - (outerCircleRadius - innerCircleRadius)}
      />
    </>
  )
}

Rotation.displayname = 'Components.Glyph.Rotation'
export default Rotation