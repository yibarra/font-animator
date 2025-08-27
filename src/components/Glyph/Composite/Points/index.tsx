import type { Context } from 'konva/lib/Context'
import { Shape } from 'react-konva'

import type { IPointProps } from './interfaces'
import { UseGlyphContext } from '../../Context'

const Points = (props: IPointProps) => {
  const { state: { viewPoints }, path: { points = [] } } = UseGlyphContext()

  const sceneFunc = (ctx: Context) => {
    if (!viewPoints) {
      return
    }

    for (let i = 0; i < points.length; i++) {
      const p = points[i]

      if (p.type === 'on-curve') {
        if (points[i - 1]?.type === 'control') {
          ctx.save()
          ctx.strokeStyle = '#fff'
          ctx.lineWidth = 1
          ctx.setLineDash([6, 6])
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(points[i - 1].x, points[i - 1].y)
          ctx.stroke()
          ctx.restore()
        }
        
        if (points[i + 1]?.type === 'control') {
          ctx.save()
          ctx.strokeStyle = '#fff'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.setLineDash([6, 6])
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(points[i + 1].x, points[i + 1].y)
          ctx.stroke()
          ctx.restore()
        }
      }
    }

    points.forEach((point) => {
      ctx.save()

      if (point.type === 'on-curve') {
        ctx.fillStyle = 'transparent'
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = '#fff'
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2, false)
        ctx.fill()
      
        ctx.save()
        ctx.scale(1, -1)

        ctx.fillStyle = '#fff'
        ctx.fillText(`(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`, point.x + 6, -(point.y + 6))
        ctx.fill()
        ctx.restore()
      } else {
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2, false)
        ctx.fill()
      }

      ctx.restore()
    })
  }

  return (
    <Shape
      {...props}
      listening={false}
      sceneFunc={sceneFunc}
      scaleY={-1}
    />
  )
}

Points.displayName = 'Components.Glyph.Points'
export default Points