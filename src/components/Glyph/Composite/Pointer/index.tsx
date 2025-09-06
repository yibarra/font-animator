import { Arrow, Circle, Text } from 'react-konva'

import { useMainStore } from '../../../../contexts/Main/store'
import { calculateDashArray, getDistance } from '../../../../contexts/Grid/helpers'
import type { IPointerProps } from './interfaces'

const Pointer = ({ position, x, y }: IPointerProps) => {
  const { isRotation } = useMainStore()
  const dist = getDistance([x, y], position)

  const props = {
    align: 'center',
    fill: "#fff",
    fontFamily: "Roboto Mono",
    fontSize: 9,
    letterSpacing: -0.04,
    width: 60,
  }

  return (
    <>
      {!isRotation && (dist > 18) && (
        <>
          <Arrow
            dash={calculateDashArray(dist, 8)}
            fill="#fff"
            points={[x,y,...position]}
            pointerLength={8}
            pointerWidth={6}
            pointerAtBeginning
            stroke="#fff"
            strokeWidth={1}
          />

          <Circle
            listening={false}
            fill="#fff"
            radius={4}
            globalCompositeOperation="destination-out"
            x={x}
            y={y}
          />

           <Circle
            listening={false}
            fill="red"
            radius={2}
            x={x}
            y={y}
          />

          <Circle
            listening={false}
            fill="#fff"
            radius={4}
            globalCompositeOperation="destination-out"
            x={position[0]}
            y={position[1]}
          />

          <Circle
            listening={false}
            fill="red"
            radius={2}
            x={position[0]}
            y={position[1]}
          />

          <Text
            {...props}
            text={`(${position[0].toFixed(0)}, ${position[1].toFixed(0)})`}
            x={position[0] - 30}
            y={position[1] + 12}
          />

          <Text
            {...props}
            height={20}
            text={`(${x.toFixed(0)}, ${y.toFixed(0)})`}
            x={position[0] < x ? x + 10 : x - (props.width + 10)}
            y={y - 5}
          />
        </>
      )}
    </>
  )
}

Pointer.displayName = 'Components.Glyph.Pointer'
export default Pointer