import { Group, Path, Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import { UseFontSettingsContext } from '../../contexts/FontSettings/FontSettings'
import type { IGlyphProps } from './interfaces'

const Glyph = ({ glyph }: IGlyphProps) => {
  console.info(glyph, '-----')
  const { getPathDataAndPointsForGlyph } = UseFontSettingsContext()

  const { path, points } = getPathDataAndPointsForGlyph(glyph.charIndex, {...glyph.frames[0]}, 126)

  const drawPoints = (context: Context) => {
    points.forEach((point) => {
      context.beginPath()
      context.arc(
        point.x, 
        point.y, 
        point.type === 'on-curve' ? 4 : 3, 
        0, 
        Math.PI * 2, 
        false
      )
      context.closePath()
      context.fillStyle = point.type === 'on-curve' ? 'transparent' : 'orange'
      context.fill()

      context.strokeStyle = 'white'
      context.lineWidth = 1
      context.stroke()
    })
  }

  return (
    <Group
      draggable
      x={glyph.position[0]}
      y={glyph.position[1]}
      scaleY={-1}
      scaleX={1}
    >
      <Path
        {...glyph.properties}
        data={path}
      />

      <Shape
        fill="transparent"
        sceneFunc={drawPoints}
      />
    </Group>
  )
}

Glyph.displayName = 'Component.Glyph'
export default Glyph