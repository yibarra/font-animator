import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import { UseGlyphContext } from '../../../Context'
import type { IMaskProps } from '../interfaces'
import { getPoints } from '../../../helpers'

// mask points
const Mask = (props: IMaskProps) => {
  const { path: { commands } } = UseGlyphContext()

  const points = getPoints(commands)

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
    <Shape
      {...props}
      globalCompositeOperation="destination-out"
      listening={false}
      sceneFunc={sceneFunc}
    />
  )
}

Mask.displayName = 'Glyph.Points'
export default Mask