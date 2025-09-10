import { Group } from 'react-konva'

import { default as Base } from './'
import type { IPointProps } from './interfaces'
import { UseGlyphContext } from '../../Context'

const Points = (props: IPointProps) => {
  const { state: { viewPoints } } = UseGlyphContext()

  if (!viewPoints) {
    return <></>
  }

  return (
    <Group {...props}>
      <Base.Mask />

      <Base.Controls />
    </Group>
  )
}

Points.displayName = 'Components.Glyph.Points'
export default Points