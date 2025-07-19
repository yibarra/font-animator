import Konva from 'konva'
import type { Context } from 'konva/lib/Context'
import { Shape } from 'react-konva'
import type { IPointProps } from './interfaces'
import type { IGlyphPoint } from '../../../../contexts/Glyphs/interfaces'

const Points = ({ points, ...props }: IPointProps) => {
  const sceneFunc = (ctx: Context) => {
    let lastOnCurvePoint: IGlyphPoint | null = null

    points.forEach((point, i) => {
      ctx.save()

      if (point.type === 'on-curve') {
        
        ctx.fillStyle = 'transparent'
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.stroke()

        lastOnCurvePoint = point
      } else {
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2, false)
        ctx.fill()

        const nextOnCurveIndex = points.findIndex((pt, idx) => idx > i && pt.type === 'on-curve')
        const nextOnCurvePoint = nextOnCurveIndex !== -1 ? points[nextOnCurveIndex] : null

        if (lastOnCurvePoint && nextOnCurvePoint) {
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 1
          ctx.setLineDash([10, 10])

          ctx.beginPath()
          ctx.moveTo(lastOnCurvePoint.x, lastOnCurvePoint.y)
          ctx.lineTo(point.x, point.y)
          ctx.lineTo(nextOnCurvePoint.x, nextOnCurvePoint.y)
          ctx.stroke()
          ctx.setLineDash([])
        }
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