import { useEffect, useRef } from 'react'
import { Group, Path, Shape, Transformer } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { KonvaEventObject } from 'konva/lib/Node'

import { UseFontSettingsContext } from '../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import { useGlyphStore } from './store'
import type { IGlyphProps } from './interfaces'
import type { Transformer as ITransformer } from 'konva/lib/shapes/Transformer'
import type { Shape as IShape } from 'konva/lib/Shape'

const Glyph = ({ current, data }: IGlyphProps) => {
  const { isDragging, setIsDragging } = useGlyphStore()
  const { setCurrent, setGlyphFramePosition, setGlyphFrameProperties } = UseGlyphsContext()
  const { getPathDataAndPointsForGlyph } = UseFontSettingsContext()

  const shapeRef = useRef(null)
  const trRef = useRef<ITransformer>(null)

  const frame = data.frames[data.currentFrame]

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
    
    const { x, y } = event.target.attrs

    setGlyphFramePosition(0, [Number(x), Number(y)])
    setIsDragging(false)
  }

  const onUpdateTransform = (rotation: number) => {
    setGlyphFrameProperties(0, { rotation })
  }

  useEffect(() => {
    if (current && trRef?.current && shapeRef.current) {
      trRef?.current?.nodes([shapeRef.current])
    }
  }, [current])

  return (
    <Group
      draggable={true}
      onDragStart={() => current && setIsDragging(true)}
      onDragEnd={onHandleDragEnd}
      onClick={() => setCurrent(data)}
      x={frame.position[0]}
      y={frame.position[1]}
      scaleY={-1}
      scaleX={1}
    >
      <Path
        {...frame.properties}
        data={path}
        ref={shapeRef}
        onTransformEnd={() => {
          const node = shapeRef?.current as IShape | null

          if (node) {
            // const scaleX = node.scaleX()
            // const scaleY = node.scaleY()
            onUpdateTransform(node.rotation())


            // x: node.x(),
            // y: node.y(),
            
          }
        }}
      />

      <Shape
        fill="transparent"
        sceneFunc={drawPoints}
      />

      {current && (
        <Transformer
          ref={trRef}
          anchorCornerRadius={12}
          padding={20}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox
            }

            return newBox
          }}
        />
      )}
    </Group>
  )
}

Glyph.displayName = 'Component.Glyph'
export default Glyph