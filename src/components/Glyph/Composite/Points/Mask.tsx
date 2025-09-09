import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import type { IMaskProps } from './interfaces'

// mask points
const Mask = ({ points, ...props }: IMaskProps) => {
  const sceneFunc = (ctx: Context) => {
    ctx.save()

    points.map(({ x, y }) => {
      ctx.beginPath()

      ctx.arc(x, y, 4, 0, Math.PI * 2, false)
      ctx.fillStyle = '#000'
      ctx.fill()
    })

    ctx.restore()
  }
  
  return (
    <Shape {...props} sceneFunc={sceneFunc} globalCompositeOperation="destination-out" />
  )
}

Mask.displayName = 'Glyph.Points'
export default Mask