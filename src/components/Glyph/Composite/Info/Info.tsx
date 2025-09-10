  import { Group, Text } from 'react-konva'

import { UseGlyphContext } from '../../Context'
import { default as Base } from './'
import { useGlyphsStore } from '../../../../contexts/Glyphs/store'
import type { IInfoGlyphProps } from './interfaces'

const Info = ({ rotation, x, y, ...props }: IInfoGlyphProps) => {
  const { config } = useGlyphsStore()
  const {
    data: { charIndex },
    path: {
      bounding: { x1, x2, y1, y2 },
      name
    },
    state: { viewCommands }
  } = UseGlyphContext()

  const label = config.glyph.controlLabel

  const propsBold = {
    ...label,
    fontStyle: 'Bold',
    fontSize: 12,
  }

  const offsetY = 160

  return (
    <Group {...props} offsetY={offsetY} x={x2 + 40}>
      {viewCommands && (
        <>
          <Text {...label} text="Unicode:" y={0} />
          <Text {...label} text="Char Index:" y={16} />
          <Text {...label} text="Rotation:" y={32} />
          <Text {...label} text="deg" x={116} y={32} />
          <Text {...label} text="Position:" y={48} />
          <Text {...propsBold} text={name} x={80} y={-2} />
          <Text {...propsBold} text={charIndex.toString()} x={80} y={14} />
          <Text {...propsBold} align="right" text={Math.abs(rotation).toFixed(0)} x={80} y={30} width={30} />
          <Text {...propsBold} text={x.toFixed(1)} x={80} y={46} />
          <Text {...propsBold} text={y.toFixed(1)} x={210} y={46} />

          <Text {...label} text="X1:" y={96} />
          <Text {...label} text="Y1:" x={140} y={96} />
          <Text {...label} text="X2:" x={0} y={112} />
          <Text {...label} text="Y2:" x={140} y={112} />
          <Text {...propsBold} text="Bounding Box" y={76} />
          <Text {...propsBold} text={x1.toFixed(1)} x={80} y={94} />
          <Text {...propsBold} text={y1.toFixed(1)} x={210} y={94} />
          <Text {...propsBold} text={x2.toFixed(1)} x={80} y={110} />
          <Text {...propsBold} text={y2.toFixed(1)} x={210} y={110} />

          <Text {...label} text="Width:" y={128} />
          <Text {...label} text="Height:" x={140} y={128} />
          <Text {...propsBold} text={(x2 - x1).toFixed(2)} x={80} y={126} />
          <Text {...propsBold} text={(Math.abs(y2) + Math.abs(y1)).toFixed(2)} x={210} y={126} />
        </>
      )}

      <Base.Glyph {...props} offsetY={-offsetY} />
    </Group>
  )
}

Info.displayName = 'Glyph.Info'
export default Info
