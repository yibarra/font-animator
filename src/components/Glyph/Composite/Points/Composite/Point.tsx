import { Circle } from 'react-konva'

import { useGlyphsStore } from '../../../../../contexts/Glyphs/store'
import type { IPointItemProps } from '../interfaces'

const Point = ({ callback, ...props }: IPointItemProps) => {
  const { config } = useGlyphsStore()

  const stylePoint = config.glyph.controlPoint

  return (
    <Circle
      {...props}
      {...stylePoint}
      draggable
      onDragMove={(event) => {
        const node = event.target

        if (typeof callback === 'function') {
          callback(node)
        }
      }}
    />
  )
}

Point.displayName = 'Glyph.Points.Point'
export default Point