import { Arrow, Circle, Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import { useMainStore } from '../../../../contexts/Main/store'
import { calculateDashArray, getDistance } from '../../../../contexts/Grid/helpers'
import type { IPointerProps } from './interfaces'

const Pointer = ({ position, x, y }: IPointerProps) => {
  const { isDragging } = useMainStore()

  const createLine = (ctx: Context) => {    
    const dist = getDistance([x, y], position)
      
    ctx.setLineDash(calculateDashArray(dist, 4))
    ctx.lineTo(position[0], position[1])
  }

  return (
    <>
      {isDragging && (
        <>
          <Shape
            sceneFunc={(ctx) => {
              ctx.beginPath()
              ctx.moveTo(x, y)
              createLine(ctx)
              ctx.lineWidth = 1
              ctx.strokeStyle = '#fff'
              ctx.stroke()
              ctx.closePath()
            }}
          />

          <Arrow
            points={[...position,x,y]}
            pointerLength={6}
            pointerWidth={10}
            pointerAtBeginning
            fill="#fff"
            stroke="#fff"
            strokeWidth={1}
          />
          <Circle
            listening={false}
            fill="transparent"
            stroke="#fff"
            strokeWidth={1}
            radius={4}
            x={position[0]}
            y={position[1]}
          />
        </>
      )}
    </>
  )
}

Pointer.displayName = 'Components.Glyph.Pointer'
export default Pointer