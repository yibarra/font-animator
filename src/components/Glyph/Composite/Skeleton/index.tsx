import type { Context } from 'konva/lib/Context'
import { Shape } from 'react-konva'

import { UseGlyphContext } from '../../Context'
import type { ISkeletonProps } from './interfaces'

const Skeleton = ({
  lineColor = '#fff',
  lineWidth = 3,
  holeRadius = 6,
  ...props
}: ISkeletonProps) => {
  const { path: { path, points = [] }, state: { viewPoints } } = UseGlyphContext()

  const sceneFunc = (ctx: Context) => {
    if (path) {
      const path2d = new window.Path2D(path)

      ctx.save()
      ctx.clip(path2d)
      ctx.restore()
    }

    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
    ctx.stroke()

    if (viewPoints) {
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