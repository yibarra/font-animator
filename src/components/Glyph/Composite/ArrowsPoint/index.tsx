import { Shape } from 'react-konva'

import { UseGlyphContext } from '../../Context'
import type { IArrowsPointProps } from './interfaces'

const ArrowsPoint = ({
  count = 16,
  fill,
  pointerLength = 12,
  pointerWidth = 16,
  ...props
}: IArrowsPointProps) => {
  const { path: { arrows } } = UseGlyphContext()

  if (!arrows || arrows.length === 0) {
    return <></>
  }

  return (
    <Shape
      {...props}
      listening={false}
      scaleY={-1}
      sceneFunc={(ctx) => {
        arrows.forEach((arrow) => {
          if (arrow) {
            const fromX = arrow.point.x - arrow.direction.x * count
            const fromY = arrow.point.y - arrow.direction.y * count
            const toX = arrow.point.x
            const toY = arrow.point.y

            ctx.beginPath()
            ctx.moveTo(fromX, fromY)
            ctx.lineTo(toX, toY)
            ctx.strokeStyle = fill || '#d71b15'
            ctx.lineWidth = 1
            ctx.stroke()

            const angle = Math.atan2(arrow.direction.y, arrow.direction.x)

            ctx.save()
            ctx.translate(toX, toY)
            ctx.rotate(angle)

            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(-pointerLength, -pointerWidth / 2)
            ctx.lineTo(-pointerLength, pointerWidth / 2)
            
            ctx.closePath()
            ctx.fillStyle = fill || '#d71b15'
            ctx.fill()

            ctx.restore()
          }
        })
      }}
    />
  )
}

ArrowsPoint.displayName = 'Components.Glyph.ArrowsPoint'
export default ArrowsPoint