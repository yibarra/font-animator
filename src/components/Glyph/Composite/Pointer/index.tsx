import { Arrow, Circle, Text } from 'react-konva'

import { useMainStore } from '../../../../contexts/Main/store'
import { calculateDashArray, getDistance } from '../../../../contexts/Grid/helpers'
import type { IPointerProps } from './interfaces'

const Pointer = ({ position, x, y }: IPointerProps) => {
  const { isDragging } = useMainStore()

  const dist = getDistance([x, y], position)

  return (
    <>
      {isDragging && (dist > 24) && (
        <>
          <Arrow
            points={[x,y,...position]}
            pointerLength={6}
            pointerWidth={10}
            dash={calculateDashArray(dist, 8)}
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

          <Text
            fill="#fff"
            fontFamily="Roboto Mono"
            fontSize={9}
            text={`(${position[0].toFixed(0)}, ${position[1].toFixed(0)})`}
            x={position[0]}
            y={position[1] + 12}
          />

          <Text
            fill="#fff"
            fontFamily="Roboto Mono"
            fontSize={9}
            text={`(${x.toFixed(0)}, ${y.toFixed(0)})`}
            x={x + 12}
            y={y}
          />
        </>
      )}
    </>
  )
}

Pointer.displayName = 'Components.Glyph.Pointer'
export default Pointer