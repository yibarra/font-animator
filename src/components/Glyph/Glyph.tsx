import { useEffect, useRef } from 'react'
import { Group, Transformer } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Path as IPathKonva } from 'konva/lib/shapes/Path'
import type { Transformer as ITransformer } from 'konva/lib/shapes/Transformer'

import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import { useGlyphStore } from './store'
import Path from './Composite/Path'
import type { IGlyphProps } from './interfaces'

const Glyph = ({ current, data, isPlaying }: IGlyphProps) => {
  const { isDragging, setIsDragging } = useGlyphStore()
  const { setCurrent, setGlyphFramePosition, setGlyphProperties } = UseGlyphsContext()

  const shapeRef = useRef<IPathKonva | null>(null)
  const trRef = useRef<ITransformer>(null)

  const onHandleDragEnd = (event: KonvaEventObject<DragEvent>) => {
    if (!isDragging && !current) {
      return
    }
    
    const { x, y } = event.target.attrs

    setGlyphFramePosition(0, [Number(x), Number(y)])
    setIsDragging(false)
  }

  const onUpdateTransform = (rotation: number) => {
    setGlyphProperties({ rotation: (rotation % 360 + 360) % 360 })
  }

  useEffect(() => {
    if (current && trRef?.current && shapeRef.current) {
      trRef?.current?.nodes([shapeRef.current])
    }
  }, [current])

  return (
    <Group
      draggable={!isPlaying}
      onDragStart={() => current && setIsDragging(true)}
      onDragEnd={onHandleDragEnd}
      onClick={() => setCurrent(current ? null : data)}
      x={data.position[0]}
      y={data.position[1]}
      scaleY={-1}
      scaleX={1}
    >
      <Path
        axes={data.axes}
        charIndex={data.charIndex}
        onUpdateTransform={onUpdateTransform}
        properties={data.properties}
        shapeRef={shapeRef}
      />

      {(current && !isPlaying) && (
        <Transformer
          anchorFill="#222"
          rotateAnchorOffset={20}
          borderStrokeWidth={0}
          anchorCornerRadius={6}
          anchorStrokeWidth={0}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox
            }

            return newBox
          }}
          padding={20}
          ignoreStroke={true}
          ref={trRef}
        />
      )}
    </Group>
  )
}

Glyph.displayName = 'Component.Glyph'
export default Glyph