import Konva from 'konva'
import type { Context } from 'konva/lib/Context'
import { Shape } from 'react-konva'
import type { IPointProps } from './interfaces'

const Points = ({ points, ...props }: IPointProps) => {
  const sceneFunc = (ctx: Context) => {
    for (let i = 0; i < points.length; i++) {
      const p = points[i]

      if (p.type === 'on-curve') {
        if (points[i - 1]?.type === 'control') {
          ctx.save()
          ctx.strokeStyle = '#ffffff'
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
          ctx.strokeStyle = '#ffffff'
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

    ctx.globalCompositeOperation = 'destination-out'

    points.forEach((point) => {
      if (point.type === 'on-curve') {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 6 / (1), 0, Math.PI * 2, false)
        ctx.fillStyle = 'black'
        ctx.fill()
      }
    })

    ctx.globalCompositeOperation = 'source-over'

    points.forEach((point) => {
      ctx.save()

      if (point.type === 'on-curve') {
        ctx.fillStyle = 'transparent'
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.stroke()
      } else {
        ctx.fillStyle = '#ffffff'
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
      filters={[Konva.Filters.Invert]}
      scaleY={-1}
    />
  )
}

Points.displayName = 'Glyph.Points'
export default Points