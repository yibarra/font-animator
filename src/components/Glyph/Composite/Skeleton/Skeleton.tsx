import type { Context } from 'konva/lib/Context'
import { Shape } from 'react-konva'

import type { ISkeletonProps } from './interfaces'

const Skeleton = ({
  points,
  lineColor = '#ffffff',
  lineWidth = 3,
  holeRadius = 6,
  pathData,
}: ISkeletonProps) => {
  const sceneFunc = (ctx: Context) => {
    if (pathData) {
      const path2d = new window.Path2D(pathData)

      ctx.save()
      ctx.clip(path2d)
      ctx.restore()
    }

    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth / (1)
    ctx.stroke()

    ctx.globalCompositeOperation = 'destination-out'

    points.forEach((point) => {
      if (point.type === 'on-curve') {
        ctx.beginPath()
        ctx.arc(point.x, point.y, holeRadius / (1), 0, Math.PI * 2, false)
        ctx.fillStyle = 'black'
        ctx.fill()
      }
    })

    ctx.globalCompositeOperation = 'source-over'
  }

  return (
    <Shape
      scaleY={-1}
      sceneFunc={sceneFunc}
      shadowColor="#0f1d44"
      shadowOffset={{ x: 0, y: -2 }}
      shadowBlur={4}
      shadowOpacity={0.4}
    />
  )
}

Skeleton.displayName = 'Glyph.Skeleton'
export default Skeleton