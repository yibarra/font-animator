import { useState } from 'react'
import { Circle } from 'react-konva'

import type { IPointItemProps } from '../interfaces'

const Point = ({ callback, ...props }: IPointItemProps) => {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <>
      {isDragging && (
        <Circle
          {...props}
          listening={false}
          fill="red"
          radius={2}
        />
      )}

      <Circle
        {...props}
        draggable
        fill="transparent"
        onMouseEnter={() => setIsDragging(true)}
        onMouseLeave={() => setIsDragging(false)}
        onDragStart={() => setIsDragging(true)}
        onDragMove={(event) => {
          const node = event.target

          if (typeof callback === 'function') {
            callback(node)
          }
        }}
        onDragEnd={() => setIsDragging(false)}
        radius={4}
        strokeWidth={2}
        stroke="red"
      />
    </>
  )
}

Point.displayName = 'Glyph.Points.Point'
export default Point