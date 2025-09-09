import { Group, Text } from 'react-konva'
import { useEffect, useRef, useState } from 'react'

import { UseGlyphContext } from '../../Context'
import type { Group as IGroup } from 'konva/lib/Group'

const Glyph = ({ rotation, x, y }: { rotation: number, y: number, x: number}) => {
  const groupRef = useRef<IGroup | null>(null)
  const [groupHeight, setGroupHeight] = useState(0)

  const { data: { charIndex }, path: { bounding, name }, state: { viewCommands } } = UseGlyphContext()

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
  
  useEffect(() => {
    if (groupRef.current) {
      const boundingBox = groupRef.current.getClientRect()
      
      setGroupHeight(boundingBox.height)
    }
  }, [viewCommands])

  if (!viewCommands) {
    return <></>
  }

  return (
    <Group
      ref={groupRef}
      offsetY={groupHeight + 40}
      x={bounding.x2 + 40}
      y={(bounding.y2 - bounding.y1) / 2 }
    >
      <Text {...props} text="Unicode:" y={0} />
      <Text {...props} {...propsBold} text={name} x={80} y={-4} />
      <Text {...props} text="Char Index:" y={16} />
      <Text {...props} {...propsBold} text={charIndex.toString()} x={80} y={12} />
      <Text {...props} text="Rotation:" y={32} />
      <Text {...props} {...propsBold} align="right" text={Math.abs(rotation).toFixed(0)} x={80} y={28} width={30} />
      <Text {...props} text="deg" x={116} y={32} />
      <Text {...props} text="Position:" y={48} />
      <Text {...props} {...propsBold} text={x.toFixed(1)} x={80} y={45} />
      <Text {...props} {...propsBold} text={y.toFixed(1)} x={210} y={45} />

      <Text {...propsBold} {...props} text="Bounding Box" y={76} />
      <Text {...props} text="X1:" y={96} />
      <Text {...props} {...propsBold} text={bounding.x1.toFixed(1)} x={80} y={96} />
      <Text {...props} text="Y1:" x={140} y={96} />
      <Text {...props} {...propsBold} text={bounding.y1.toFixed(1)} x={210} y={96} />
      <Text {...props} text="X2:" x={0} y={114} />
      <Text {...props} {...propsBold} text={bounding.x2.toFixed(1)} x={80} y={112} />
      <Text {...props} text="Y2:" x={140} y={114} />
      <Text {...props} {...propsBold} text={bounding.y2.toFixed(1)} x={210} y={112} />

      <Text {...props} text="Width:" y={130} />
      <Text {...props} {...propsBold} text={(bounding.x2 - bounding.x1).toFixed(2)} x={80} y={128} />
      <Text {...props} text="Height:" x={140} y={130} />
      <Text {...props} {...propsBold} text={(Math.abs(bounding.y2) + Math.abs(bounding.y1)).toFixed(2)} x={210} y={128} />
    </Group>
  )
}

Glyph.displayName = 'Components.Glyph.Info.Glyph'
export default Glyph