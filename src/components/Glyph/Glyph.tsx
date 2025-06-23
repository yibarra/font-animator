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
  const { setCurrent, setGlyphPosition, setGlyphRotate } = UseGlyphsContext()

  const shapeRef = useRef<IPathKonva | null>(null)
  const trRef = useRef<ITransformer>(null)

  const onHandleDragEnd = (event: KonvaEventObject<DragEvent>) => {
    if (!isDragging && !current) {
      return
    }
    
    const { x, y, rotation } = event.target.attrs
    console.info(rotation, 'rotation')

    setGlyphPosition([Number(x), Number(y)])
    setIsDragging(false)
  }

  const onUpdateTransform = (rotation: number) => {
    setGlyphRotate(((rotation % 360) + 360) % 360)
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
      rotation={data.rotate} // isPlaying
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
          anchorFill="#d7d7d7dd"
          anchorSize={12}
          borderStrokeWidth={1}
          borderDash={[8, 20]}
          borderStroke='#d7d7d7dd'
          anchorCornerRadius={2}
          anchorStrokeWidth={0}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
          boundBoxFunc={(oldBox, newBox) => {
            newBox.width = oldBox.width
            newBox.height = oldBox.height

            return newBox
          }}
          padding={40}
          ignoreStroke={true}
          ref={trRef}
        />
      )}
    </Group>
  )
}

Glyph.displayName = 'Component.Glyph'
export default Glyph