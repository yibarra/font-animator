import { useRef, useState } from 'react'
import { Group } from 'react-konva'
import type { Path as IPathKonva } from 'konva/lib/shapes/Path'

import Path from './Composite/Path'
import PathFrame from './Composite/PathFrame'
import Rotation from './Composite/Rotation'
import { UseFontSettingsContext } from '../../contexts/FontSettings/FontSettings'
import type { IGlyphProps } from './interfaces'

const Glyph = ({ current, data, index, isPlaying }: IGlyphProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [positionDrag, setPositionDrag] = useState<[number, number, number]>([...data.position, data.rotation])

  const shapeRef = useRef<IPathKonva | null>(null)

  const { getPathDataGlyph } = UseFontSettingsContext()

  const numericAxes = Object.fromEntries(
    Object.entries(data.axes).map(([key, value]) => [key, Number(value)])
  )

  const { bounding, path } = getPathDataGlyph(
    data.charIndex,
    numericAxes,
    data.properties.fontSize ?? 12
  )

  return (
    <Group>
     {/* <PathFrame
        {...data}
        //position={isDragging ? [positionDrag[0], positionDrag[1]] : data.frames[0].position}
        //rotation={isDragging ? positionDrag[2] : data.frames[0].rotation}
        shapeRef={shapeRef}
        properties={{ ...data.properties, fill: '#FFF', opacity: 0.3 }}
      />
      */}

      <Path
        {...data}
        current={current}
        index={index}
        shapeRef={shapeRef}
        setIsDragging={setIsDragging}
        setPositionDrag={setPositionDrag}
        rotation={isDragging ? positionDrag[2] : data.frames[0].rotation}
        x={isDragging ? positionDrag[0] : data.frames[0].position[0]}
        y={isDragging ? positionDrag[1] : data.frames[0].position[1]}
      />

      {!isPlaying && (
        <Rotation
          bounding={bounding}
          glyph={data}
          isDragging={isDragging}
          rotation={isDragging ? positionDrag[2] : data.frames[0].rotation}
          setIsDragging={setIsDragging}
          setPositionDrag={setPositionDrag}
          x={isDragging ? positionDrag[0] : data.frames[0].position[0]}
          y={isDragging ? positionDrag[1] : data.frames[0].position[1]}
        />
      )}
    </Group>
  )
}

Glyph.displayName = 'Component.Glyph'
export default Glyph