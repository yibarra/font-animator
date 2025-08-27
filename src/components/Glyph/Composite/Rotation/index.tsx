import { useRef } from 'react'
import { Circle } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import Progress from '../Progress'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import type { IRotationProps } from './interfaces'
import { UseGlyphContext } from '../../Context'
import { useMainStore } from '../../../../contexts/Main/store'

const Rotation = ({
  currentFrame,
  outerCircleRadius = 10,
  innerCircleRadius = 5,
  setPositionDrag,
  rotation,
  x = 20,
  y = 20
}: IRotationProps) => {
  const shapeRef = useRef(null)

  const { isDragging, setIsDragging } = useMainStore()
  const { data, path } = UseGlyphContext()
  const { setGlyphRotate } = UseGlyphsContext()

  const { bounding } = path

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

      setPositionDrag((prev) => [prev[0], prev[1], angle * (180 / Math.PI)])
    }
  }

  const rotationY = y + Math.abs(bounding.y1 / 2) + 6

  return (
    <>
      <Progress.Border
        radius={outerCircleRadius - 2}
        rotation={-((isDragging ? rotation : data.rotation) + 90)}
        x={x}
        y={rotationY}
      />

      <Circle
        draggable
        fill="transparent"
        ref={shapeRef}
        onDragStart={() => setIsDragging(true)}
        onDragMove={handleDragMove}
        onDragEnd={() => setGlyphRotate(data?.id, currentFrame, data?.position, rotation)}
        radius={outerCircleRadius}
        x={x + outerCircleRadius - innerCircleRadius}
        y={rotationY}
      />
    </>
  )
}

Rotation.displayname = 'Components.Glyph.Rotation'
export default Rotation