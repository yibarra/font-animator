import { useCallback, useState } from 'react'
import { Circle } from 'react-konva'

import type { BezierCurveProps } from './interfaces'

const BezierCurve = ({ args, onChange, x, y }: BezierCurveProps) => {
  const [points, setPoints] = useState([x, y, ...args])

  const updatePoint = useCallback(
    (index: number, newX: number, newY: number) => {
      const newPoints = [...points]
      newPoints[index] = newX
      newPoints[index + 1] = newY

      setPoints(newPoints)
      onChange?.(newPoints)
    },
    [points, onChange]
  )

  return (
    <>
      {[
        { x: points[0], y: points[1], fill: "purple" },  // start
        { x: points[2], y: points[3], fill: "red" },    // cp1
        { x: points[4], y: points[5], fill: "orange" }, // cp2
        { x: points[6], y: points[7], fill: "blue" },   // end
      ].map((p, i) => (
        <Circle
          {...p}
          key={i}
          radius={4}
          draggable
          onDragMove={(e) => {
            updatePoint(i * 2, e.target.x(), e.target.y())
          }}
        />
      ))}
    </>
  )
}

BezierCurve.displayName = 'Glyph.Points.BezierCurve'
export default BezierCurve