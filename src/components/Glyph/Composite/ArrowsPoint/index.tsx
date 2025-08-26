import { Shape } from 'react-konva'

import type { IArrowsPointProps } from './interfaces'

const ArrowsPoint = ({
  arrows,
  count = 16,
  fill,
  pointerLength = 12,
  pointerWidth = 16,
  ...props
}: IArrowsPointProps) => {
  if (!arrows || arrows.length === 0) {
    return <></>
  }

  return (
    <Shape
      {...props}
      scaleY={-1}
      sceneFunc={(ctx) => {
        const end = arrows[1]

        if (end) {
          const fromX = end.point.x - end.direction.x * count
          const fromY = end.point.y - end.direction.y * count
          const toX = end.point.x
          const toY = end.point.y

          ctx.beginPath()
          ctx.moveTo(fromX, fromY)
          ctx.lineTo(toX, toY)
          
          const angle = Math.atan2(end.direction.y, end.direction.x)

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
        }}
      }
    />
  )
}

ArrowsPoint.displayName = 'Components.Glyph.ArrowsPoint'
export default ArrowsPoint