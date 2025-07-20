import { useRef, useState } from 'react'
import { Group } from 'react-konva'
import type { Path as IPathKonva } from 'konva/lib/shapes/Path'

import { default as Base } from './index'
import { UseFontSettingsContext } from '../../contexts/FontSettings/FontSettings'
import type { IGlyphProps } from './interfaces'

const Glyph = ({ current, data, index, isPlaying }: IGlyphProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [skeleton, setSkeleton] = useState(false)
  const [positionDrag, setPositionDrag] = useState<[number, number, number]>([...data.position, data.rotation])

  const shapeRef = useRef<IPathKonva | null>(null)

  const { getPathDataGlyph } = UseFontSettingsContext()

  const numericAxes = Object.fromEntries(
    Object.entries(data.axes).map(([key, value]) => [key, Number(value)])
  )

  const { bounding } = getPathDataGlyph(
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

      <Base.Path
        {...data}
        current={current}
        skeleton={skeleton}
        index={index}
        isDragging={isDragging}
        shapeRef={shapeRef}
        setIsDragging={setIsDragging}
        setPositionDrag={setPositionDrag}
        rotation={isDragging ? positionDrag[2] : data.frames[0].rotation}
        x={isDragging ? positionDrag[0] : data.frames[0].position[0]}
        y={isDragging ? positionDrag[1] : data.frames[0].position[1]}
      />

      <Base.Toggle
        bounding={bounding}
        glyph={data}
        numericAxes={numericAxes}
        skeleton={skeleton}
        setSkeleton={setSkeleton}
        x={isDragging ? positionDrag[0] : data.frames[0].position[0]}
        y={isDragging ? positionDrag[1] : data.frames[0].position[1]}
      />

      {!isPlaying && (
        <Base.Rotation
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