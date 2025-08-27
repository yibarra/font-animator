import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { default as Base } from './index'
import { useMainStore } from '../../contexts/Main/store'
import type { IGlyphProps } from './interfaces'

const Glyph = ({
  current,
  data,
  index,
}: IGlyphProps) => {
  const { isPlaying = false, isDragging } = useMainStore()

  const [searchParams] = useSearchParams()
  const currentFrame = Number(searchParams.get('frame') ?? 0)

  const [positionDrag, setPositionDrag] = useState<[number, number, number]>([...data.position, data.rotation])

  const { position } = data

  const rotation = isDragging ? positionDrag[2] : data.rotation
  const x = isDragging ? positionDrag[0] : position[0]
  const y = isDragging ? positionDrag[1] : position[1]

  return (
    <Base.Root data={data}>
      <Base.Path
        currentFrame={currentFrame}
        current={current}
        index={index}
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
                currentFrame={currentFrame}
                rotation={rotation}
                setPositionDrag={setPositionDrag}
                x={x}
                y={y}
              />

              {(
                <Base.Info
                  currentFrame={currentFrame}
                  rotation={rotation}
                  x={x}
                  y={y}
                />
              )}
            </>
          )}
        </>
      )}
    </Base.Root>
  )
}

Glyph.displayName = 'Components.Glyph'
export default Glyph