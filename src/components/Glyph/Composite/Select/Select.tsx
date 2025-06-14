import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import type { ISelectProps } from './interfaces'

const Select = ({ cornerWidth = 12, points }: ISelectProps) => {

  return (
    <Shape
      x={0}
      y={0}
    />
  )
}

Select.displayName = 'Components.Glyph.Select'
export default Select
