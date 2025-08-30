import type { Context } from 'konva/lib/Context'
import { Circle, Group, Shape } from 'react-konva'

import { UseGlyphContext } from '../../Context'
import type { IPointProps } from './interfaces'

const Points = (props: IPointProps) => {
  const { state: { viewPoints }, path: { points = [] } } = UseGlyphContext()

  if (!viewPoints) {
    return <></>
  }

  const sceneFunc = (ctx: Context) => {
    for (let i = 0; i < points.length; i++) {
      const p = points[i]

      if (p.type === 'on-curve') {
        if (points[i - 1]?.type === 'control') {
          ctx.save()
          ctx.strokeStyle = '#fff'
          ctx.lineWidth = 1
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
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(points[i + 1].x, points[i + 1].y)
          ctx.stroke()
          ctx.restore()
        }
      }
    }

    points.forEach((point) => {
      ctx.save()
      ctx.scale(1, -1)
      ctx.beginPath()
      ctx.fillStyle = '#fff'
      ctx.font = '9px Roboto Mono'
      ctx.letterSpacing = '-0.5px'
      ctx.fillText(`(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`, point.x + 6, -(point.y + 6))
      ctx.fill()
      ctx.closePath()
      ctx.restore()
    })

    ctx.globalCompositeOperation = 'destination-out'

    points.forEach((point) => {
      if (point.type === 'on-curve') {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2, false)
        ctx.fillStyle = '#000'
        ctx.fill()
      }
    })

    ctx.restore()
  }

  return (
    <>
      <Shape
        {...props}
        listening={false}
        sceneFunc={sceneFunc}
        scaleY={-1}
      />

      <Group {...props} scaleY={-1}>
        { Array.isArray(points) && points.map((point, k) => (
          <Circle
            {...point}
            stroke="#fff"
            strokeWidth={point.type === 'on-curve' ? 2 : 0}
            fill={point.type === 'on-curve' ? 'transparent' : '#fff'}
            key={k}
            radius={point.type === 'on-curve' ? 4 : 3}
          />
        ))}
      </Group>
    </>
  )
}

Points.displayName = 'Components.Glyph.Points'
export default Points