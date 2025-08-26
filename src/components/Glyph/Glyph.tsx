import { useRef, useState } from 'react'
import { Group } from 'react-konva'
import { useSearchParams } from 'react-router-dom'
import type { Path as IPathKonva } from 'konva/lib/shapes/Path'

import { default as Base } from './index'
import { UseFontSettingsContext } from '../../contexts/FontSettings'
import Info from './Composite/Info'
import { useMainStore } from '../../contexts/Main/store'
import type { IGlyphProps } from './interfaces'

const Glyph = ({
  current,
  data,
  index,
}: IGlyphProps) => {
  const { isPlaying = false } = useMainStore()

  const [searchParams] = useSearchParams()
  const currentFrame = Number(searchParams.get('frame') ?? 0)

  const shapeRef = useRef<IPathKonva | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [metrics, setMetrics] = useState(true)
  const [baseLines, setBaseLines] = useState(true)
  const [skeleton, setSkeleton] = useState(true)
  const [viewPoints, setViewPoints] = useState(false)

  const [positionDrag, setPositionDrag] = useState<[number, number, number]>([...data.position, data.rotation])

  const { charIndex, position, properties, ...propsData } = data

  const { getPathDataGlyph } = UseFontSettingsContext()

  const numericAxes = Object.fromEntries(
    Object.entries(data.axes).map(([key, value]) => [key, Number(value)])
  )

  const { bounding, commands, points, ...pathData } = getPathDataGlyph(
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
        baseLines={baseLines}
        currentFrame={currentFrame}
        points={points}
        bounding={bounding}
        charIndex={charIndex}
        current={current}
        metrics={metrics}
        skeleton={skeleton}
        index={index}
        isDragging={isDragging}
        properties={properties}
        shapeRef={shapeRef}
        setIsDragging={setIsDragging}
        setPositionDrag={setPositionDrag}
        rotation={rotation}
        viewPoints={viewPoints}
        x={x}
        y={y}
      />

      {current && (
        <>
          {!isPlaying && (
            <>
              <Base.Rotation
                bounding={bounding}
                currentFrame={currentFrame}
                glyph={data}
                isDragging={isDragging}
                rotation={rotation}
                setIsDragging={setIsDragging}
                setPositionDrag={setPositionDrag}
                x={x}
                y={y}
              />

              {(
                <Info
                  bounding={bounding}
                  currentFrame={currentFrame}
                  commands={commands}
                  id={data.id}
                  position={data.position}
                  points={points}
                  rotation={rotation}
                  skeleton={skeleton}
                  setSkeleton={setSkeleton}
                  metrics={metrics}
                  baseLines={baseLines}
                  setBaseLines={setBaseLines}
                  setMetrics={setMetrics}
                  setViewPoints={setViewPoints}
                  viewPoints={viewPoints}
                  x={x}
                  y={y}
                />
              )}
            </>
          )}
        </>
      )}
    </Group>
  )
}

Glyph.displayName = 'Component.Glyph'
export default Glyph