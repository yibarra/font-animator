import { Shape } from 'react-konva'

import { useMainStore } from '../../../../contexts/Main/store'
import { calculateDashArray, getDistance } from '../../../../contexts/Grid/helpers'
import type { Context } from 'konva/lib/Context'

const Pointer = ({ position, x, y }: any) => {
  const { isDragging } = useMainStore()

  const createLine = (ctx: Context) => {    
    const dist = getDistance([x, y], position)
      
    ctx.setLineDash(calculateDashArray(dist, 6))
    ctx.lineTo(position[0], position[1])
  }

  return (
    <Shape
      sceneFunc={(ctx) => {
        ctx.beginPath()
        ctx.moveTo(x, y)
        createLine(ctx)
        ctx.lineWidth = 1
        ctx.strokeStyle = '#fff'
        ctx.stroke()
        ctx.closePath()

        if (isDragging) {
          ctx.beginPath()
          ctx.arc(position[0], position[1], 2, 0, Math.PI * 2)
          ctx.setLineDash([0, 0])
          ctx.fillStyle = '#fff'
          ctx.lineWidth = 2
          ctx.strokeStyle = '#fff'
          ctx.stroke()
          ctx.fill()
          ctx.closePath()
        }
      }}
    />
  )
}

Pointer.displayName = 'Components.Glyph.Pointer'
export default Pointer