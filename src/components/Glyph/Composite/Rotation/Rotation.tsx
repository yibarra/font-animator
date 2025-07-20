import { useRef } from 'react'
import { Circle, Group } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'
import Progress from '../Progress'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import type { IRotationProps } from './interfaces'

const Rotation = ({
  bounding,
  glyph,
  isDragging,
  outerCircleRadius = 10,
  innerCircleRadius = 5,
  setIsDragging,
  setPositionDrag,
  rotation,
  x = 20,
  y = 20
}: IRotationProps) => {
  const shapeRef = useRef(null)
  const { setGlyphRotate } = UseGlyphsContext()

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

  return (
    <Group x={bounding.x2 / 2 + 80} y={-bounding.y2 / 2 + 40}>
      <Progress.Border
        radius={outerCircleRadius - 2}
        rotation={-((isDragging ? rotation : glyph.rotation) + 90)}
        x={x}
        y={y}
      />

      <Circle
        draggable
        fill="transparent"
        ref={shapeRef}
        onDragStart={() => setIsDragging(true)}
        onDragMove={handleDragMove}
        onDragEnd={() => setGlyphRotate(glyph?.id, 0, glyph?.position, rotation)}
        radius={outerCircleRadius}
        x={x + outerCircleRadius - innerCircleRadius}
        y={y}
      />
    </Group>
  )
}

export default Rotation