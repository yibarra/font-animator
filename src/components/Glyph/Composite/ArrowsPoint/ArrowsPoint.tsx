import { Shape } from 'react-konva'

const ArrowsPoint = ({ arrows }: any) => {
  return (
    <Shape
      scaleY={-1}
      sceneFunc={(ctx) => {
        const arrowLength = 16
        const arrowPointerLength = 12
        const arrowPointerWidth = 16

        const end = arrows?.end

        if (end) {
          const fromX = end.point.x - end.direction.x * arrowLength
          const fromY = end.point.y - end.direction.y * arrowLength
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
          ctx.lineTo(-arrowPointerLength, -arrowPointerWidth / 2)
          ctx.lineTo(-arrowPointerLength, arrowPointerWidth / 2)
          
          ctx.closePath()

          ctx.fillStyle = '#FF0000'
          ctx.fill()

          ctx.restore()
        }}
      }
    />
  )
}

ArrowsPoint.displayName = 'Glyph.ArrowsPoint'
export default ArrowsPoint