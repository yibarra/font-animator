import { Circle, Line } from 'react-konva'

import type { QuadraticCurveProps } from '../interfaces'
import { adjustedLine } from '../../../helpers'

const QuadraticCurve = ({ args, onChange, x, y }: QuadraticCurveProps) => {
  const points = [x, y, ...args]

  const updatePoint = (index: number, newX: number, newY: number) => {
    const newPoints = [...points]
    newPoints[index] = newX
    newPoints[index + 1] = newY

    onChange?.(newPoints.slice(2))
  }

  const propsLine = {
    dash: [6, 4],
    stroke: '#fff',
    strokeWidth: 1
  }

  const linePoints = [
    adjustedLine([...points], 6),
    adjustedLine([points[4], points[5], points[2], points[3]], 6)
  ]

  return (
    <>
      {Array.isArray(linePoints) && linePoints.map(
        (l, k) => (<Line {...propsLine} points={l} key={k} />)
      )}

      {[
        { x: points[0], y: points[1], radius: 4, listening: false }, // start
        { x: points[2], y: points[3], radius: 4 }, // control
        { x: points[4], y: points[5], radius: 4 }, // end
      ].map((p, i) => (
        <Circle
          {...p}
          draggable
          fill="transparent"
          key={i}
          
          onDragMove={(event) => {
            const node = event.target
            
            updatePoint(i * 2, node.x(), node.y())
          }}
          stroke="red"
          strokeWidth={2}
        />
      ))}
    </>
  )
}

QuadraticCurve.displayName = 'Glyph.Points.QuadraticCurve'
export default QuadraticCurve
