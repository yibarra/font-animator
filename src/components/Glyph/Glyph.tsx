import { useEffect, useMemo, useRef } from 'react'
import { Group, Transformer } from 'react-konva'
import { useSearchParams } from 'react-router-dom'
import type { Path as IPathKonva } from 'konva/lib/shapes/Path'
import type { Transformer as ITransformer } from 'konva/lib/shapes/Transformer'

import Path from './Composite/Path'
import type { IGlyphProps } from './interfaces'

const Glyph = ({ data, isPlaying }: IGlyphProps) => {
  const [searchParams] = useSearchParams()
  
  const current = useMemo(() => searchParams.get('glyph') === data.id, [data, searchParams])
  const frame = useMemo(() => Number(searchParams.get('frame')), [searchParams])

  const shapeRef = useRef<IPathKonva | null>(null)
  const trRef = useRef<ITransformer>(null)

  useEffect(() => {
    if (current && trRef?.current && shapeRef.current) {
      trRef?.current?.nodes([shapeRef.current])
    }
  }, [current])

  return (
    <Group
      rotation={current ? data.frames[frame].rotation : data.rotation} // isPlaying
      scaleY={-1}
      scaleX={1}
      x={data.position[0]}
      y={data.position[1]}
    >
      <Path {...data} shapeRef={shapeRef} />

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