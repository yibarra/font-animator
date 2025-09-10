import { Line } from 'react-konva'

import { default as Base } from '../index'
import { useGlyphsStore } from '../../../../../contexts/Glyphs/store'
import type { IQuadraticCurveProps } from '../interfaces'
import { offsetLineByRadius } from '../../../helpers'

const QuadraticCurve = ({ args, onChange, x, y }: IQuadraticCurveProps) => {
  const { config } = useGlyphsStore()
  
  const points = [x, y, ...args]

  const updatePoint = (index: number, newX: number, newY: number) => {
    const newPoints = [...points]
    newPoints[index] = newX
    newPoints[index + 1] = newY

    onChange?.(newPoints.slice(2))
  }

  return (
    <>
      {[
        offsetLineByRadius([...points], 6),
        offsetLineByRadius([points[4], points[5], points[2], points[3]], 6)
      ].map(
        (l, k) => (<Line {...config.glyph.controlLine} points={l} key={k} />)
      )}

      {[
        { x: points[0], y: points[1], listening: false }, // start
        { x: points[2], y: points[3], }, // control
        { x: points[4], y: points[5], }, // end
      ].map((p, i) => (
        <Base.Point
          {...p}
          key={i}
          radius={4}
          callback={(node) => {
            if (node) {
              updatePoint(i * 2, node.x(), node.y())
            }
          }}
        />
      ))}
    </>
  )
}

QuadraticCurve.displayName = 'Glyph.Points.QuadraticCurve'
export default QuadraticCurve
