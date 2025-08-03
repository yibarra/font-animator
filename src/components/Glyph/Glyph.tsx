import { useRef, useState } from 'react'
import { Group } from 'react-konva'
import type { Path as IPathKonva } from 'konva/lib/shapes/Path'

import { default as Base } from './index'
import { UseFontSettingsContext } from '../../contexts/FontSettings/FontSettings'
import type { IGlyphProps } from './interfaces'
import Info from './Composite/Info'
import { useSearchParams } from 'react-router-dom'

const Glyph = ({
  current,
  data,
  index,
  isPlaying,
}: IGlyphProps) => {
  const [searchParams] = useSearchParams()
  const currentFrame = Number(searchParams.get('frame') ?? 0)

  const shapeRef = useRef<IPathKonva | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [skeleton, setSkeleton] = useState(false)
  const [positionDrag, setPositionDrag] = useState<[number, number, number]>([...data.position, data.rotation])

  const { charIndex, position, properties, ...propsData } = data

  const { getPathDataGlyph } = UseFontSettingsContext()

  const numericAxes = Object.fromEntries(
    Object.entries(data.axes).map(([key, value]) => [key, Number(value)])
  )

  const { bounding, points, ...pathData } = getPathDataGlyph(
    charIndex,
    numericAxes,
    properties.fontSize ?? 12
  )

  const rotation = isDragging ? positionDrag[2] : data.rotation
  const x = isDragging ? positionDrag[0] : position[0]
  const y = isDragging ? positionDrag[1] : position[1]

  return (
    <Group>
      <Base.Path
        {...propsData}
        {...pathData}
        currentFrame={currentFrame}
        points={points}
        bounding={bounding}
        charIndex={charIndex}
        current={current}
        skeleton={skeleton}
        index={index}
        isDragging={isDragging}
        properties={properties}
        shapeRef={shapeRef}
        setIsDragging={setIsDragging}
        setPositionDrag={setPositionDrag}
        rotation={rotation}
        x={x}
        y={y}
      />

      {current && (
        <>
          {!isPlaying && (
            <>
              <Base.Rotation
                bounding={bounding}
                glyph={data}
                isDragging={isDragging}
                rotation={rotation}
                setIsDragging={setIsDragging}
                setPositionDrag={setPositionDrag}
                x={x}
                y={y}
              />

              {!isDragging && (<Info
                id={data.id}
                currentFrame={currentFrame}
                position={data.position}
                bounding={bounding}
                points={points}
                skeleton={skeleton}
                setSkeleton={setSkeleton}
                x={x}
                y={y}
              />)}
            </>
          )}
        </>
      )}
    </Group>
  )
}

Glyph.displayName = 'Component.Glyph'
export default Glyph