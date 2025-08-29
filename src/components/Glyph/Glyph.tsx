import { useState } from 'react'

import { useMainStore } from '../../contexts/Main/store'
import { default as Base } from './index'
import type { IGlyphProps } from './interfaces'

const Glyph = ({
  current,
  data,
  index,
}: IGlyphProps) => {
  const { isPlaying = false, isDragging } = useMainStore()
  const [positionDrag, setPositionDrag] = useState<[number, number, number]>([...data.position, data.rotation])

  const { position, rotation } = data

  const rotate = isDragging ? positionDrag[2] : rotation
  const x = isDragging ? positionDrag[0] : position[0]
  const y = isDragging ? positionDrag[1] : position[1]

  return (
    <Base.Root data={data}>
      <Base.Path
        current={current}
        index={index}
        rotation={rotate}
        setPositionDrag={setPositionDrag}
        x={x}
        y={y}
      />
      
      {(current && !isPlaying) && (
        <>
          <Base.Pointer position={position} x={x} y={y} />

          <Base.Rotation
            rotation={rotate}
            setPositionDrag={setPositionDrag}
            x={x}
            y={y}
          />

          {!isDragging && (
            <Base.Info rotation={rotate} x={x} y={y} />
          )}
        </>
      )}
    </Base.Root>
  )
}

Glyph.displayName = 'Components.Glyph'
export default Glyph