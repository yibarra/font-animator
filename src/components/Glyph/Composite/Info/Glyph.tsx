import { Group, Text } from 'react-konva'

import { UseGlyphContext } from '../../Context'
import { useFontStore } from '../../../../contexts/Font/store'
import Commands from './Commands'

const Glyph = ({ rotation, x, y }: { rotation: number, y: number, x: number}) => {
  const { font } = useFontStore()
  const { data: { charIndex, properties: { fontSize }}, path: { bounding }, state: { viewCommands } } = UseGlyphContext()

  const scaleFactor = fontSize / (font?.unitsPerEm ?? 0)

  const ascenderY = -(font?.ascent ?? 0) * scaleFactor

  const props = {
    fill: '#fff',
    fontFamily: 'Roboto Mono',
    fontSize: 10,
    letterSpacing: -0.4
  }

  const propsBold = {
    fontStyle: 'Bold',
    fontSize: 14,
  }

  if (!viewCommands) {
    return <></>
  }

  return (
    <Group offsetY={-((ascenderY) - 35)} x={bounding.x2 + 40} y={0}>
      <Text {...props} text="Char Index:" y={0} />
      <Text {...props} {...propsBold} text={charIndex.toString()} x={68} y={-2} />
      <Text {...props} text="Rotation:" y={16} />
      <Text {...props} {...propsBold} align="right" text={Math.abs(rotation).toFixed(0)} x={60} y={14} width={32} />
      <Text {...props} text="deg" x={98} y={16} />
      <Text {...props} text="Position:" y={32} />
      <Text {...props} {...propsBold} text={x.toFixed(1)} x={70} y={30} />
      <Text {...props} {...propsBold} text={y.toFixed(1)} x={140} y={30} />

      <Text {...props} text="Bounding Box" y={64} />
      <Text {...props} text="X1:" y={82} />
      <Text {...props} {...propsBold} text={bounding.x1.toFixed(1)} x={70} y={80} />
      <Text {...props} text="Y1:" x={140} y={82} />
      <Text {...props} {...propsBold} text={bounding.y1.toFixed(1)} x={210} y={80} />
      <Text {...props} text="X2:" x={0} y={98} />
      <Text {...props} {...propsBold} text={bounding.x2.toFixed(1)} x={70} y={96} />
      <Text {...props} text="Y2:" x={140} y={98} />
      <Text {...props} {...propsBold} text={bounding.y2.toFixed(1)} x={210} y={96} />

      <Text {...props} text="Width:" y={114} />
      <Text {...props} {...propsBold} text={(bounding.x2 - bounding.x1).toFixed(2)} x={70} y={112} />
      <Text {...props} text="Height:" x={140} y={114} />
      <Text {...props} {...propsBold} text={(Math.abs(bounding.y2) + Math.abs(bounding.y1)).toFixed(2)} x={210} y={112} />

      <Commands {...props} y={160} />
    </Group>
  )
}

Glyph.displayName = 'Components.Glyph.Info.Glyph'
export default Glyph