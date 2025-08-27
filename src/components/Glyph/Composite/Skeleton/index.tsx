import type { Context } from 'konva/lib/Context'
import { Shape } from 'react-konva'

import { UseGlyphContext } from '../../Context'
import type { ISkeletonProps } from './interfaces'

const Skeleton = ({
  holeRadius = 6,
  lineColor = '#fff',
  lineWidth = 3,
  ...props
}: ISkeletonProps) => {
  const { path: { path, points = [] }, state: { viewPoints } } = UseGlyphContext()

  const sceneFunc = (ctx: Context) => {
    if (path) {
      const path2d = new window.Path2D(path)
      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth / 2
      ctx.stroke(path2d)
    }

    if (viewPoints) {
      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'

      points.forEach((point) => {
        if (point.type === 'on-curve') {
          ctx.beginPath()
          ctx.arc(point.x, point.y, holeRadius, 0, Math.PI * 2, false)
          ctx.fillStyle = 'rgba(0, 0, 0, 1)'
          ctx.fill()
        }
      })
  
      ctx.restore()
    }
  }

  return (
    <Shape
      {...props}
      scaleY={-1}
      sceneFunc={sceneFunc}
    />
  )
}

Skeleton.displayName = 'Components.Glyph.Skeleton'
export default Skeleton