import { Group, Path, Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { KonvaEventObject } from 'konva/lib/Node'

import { UseFontSettingsContext } from '../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import Select from './Composite/Select'
import { useGlyphStore } from './store'
import type { IGlyphProps } from './interfaces'

const Glyph = ({ current, data }: IGlyphProps) => {
  const { currentFrame, isDragging, setIsDragging } = useGlyphStore()

  const { setCurrent, setGlyphFramePosition } = UseGlyphsContext()
  const { getPathDataAndPointsForGlyph } = UseFontSettingsContext()

  const frame = data.frames[currentFrame]

  const numericAxes = Object.fromEntries(
    Object.entries(frame.axes).map(([key, value]) => [key, Number(value)])
  )

  const { path, points } = getPathDataAndPointsForGlyph(
    data.charIndex, numericAxes,
    Number(frame.properties?.fontSize ?? 12)
  )

  const drawPoints = (context: Context) => {
    points.forEach((point) => {
      context.beginPath()
      context.arc(
        point.x, 
        point.y, 
        point.type === 'on-curve' ? 1 : 1, 
        0, 
        Math.PI * 2, 
        false
      )
      context.closePath()
      context.fillStyle = point.type === 'on-curve' ? 'white' : 'orange'
      context.fill()

      context.strokeStyle = 'white'
      context.lineWidth = 1
      context.stroke()
    })
  }

  const onHandleDragEnd = (event: KonvaEventObject<DragEvent>) => {
    if (!isDragging && !current) {
      return
    }

    console.info(event)

    const { x, y } = event.target.attrs

    setGlyphFramePosition(0, [Number(x), Number(y)])
    setIsDragging(false)
  }

  return (
    <Group
      draggable={true}
      onDragStart={() => current && setIsDragging(true)}
      onDragEnd={onHandleDragEnd}
      onClick={() => setCurrent(data ?? null)}
      x={frame.position[0]}
      y={frame.position[1]}
      scaleY={-1}
      scaleX={1}
    >
      <Path
        {...frame.properties}
        data={path}
      />

      <Shape
        fill="transparent"
        sceneFunc={drawPoints}
      />

      {current && (<Select padding={20} points={points} />)}
    </Group>
  )
}

Glyph.displayName = 'Component.Glyph'
export default Glyph