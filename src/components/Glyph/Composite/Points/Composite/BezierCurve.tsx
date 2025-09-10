import { useCallback, useState } from 'react'

import { default as Base } from '../index'
import type { IBezierCurveProps } from '../interfaces'

const BezierCurve = ({ args, onChange, x, y }: IBezierCurveProps) => {
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
      ].map((point, i) => (
        <Base.Point
          {...point}
          key={i}
          callback={(node) => updatePoint(i * 2, node.x(), node.y())}
        />
      ))}
    </>
  )
}

BezierCurve.displayName = 'Glyph.Points.BezierCurve'
export default BezierCurve