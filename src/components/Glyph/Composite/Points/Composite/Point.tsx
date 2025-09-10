import { useState } from 'react'
import { Circle } from 'react-konva'

import { useGlyphsStore } from '../../../../../contexts/Glyphs/store'
import type { IPointItemProps } from '../interfaces'

const Point = ({ callback, ...props }: IPointItemProps) => {
  const { config } = useGlyphsStore()
  const [isDragging, setIsDragging] = useState(false)

  return (
    <>
      {isDragging && (
        <Circle
          {...props}
          listening={false}
          fill={config.glyph.controlPoint.stroke}
          radius={(config.glyph.controlPoint.radius ?? 0) / 2}
        />
      )}

      <Circle
        {...props}
        {...config.glyph.controlPoint}
        draggable
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
      />
    </>
  )
}

Point.displayName = 'Glyph.Points.Point'
export default Point