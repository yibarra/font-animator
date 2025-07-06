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

  const shapeRef = useRef<IPathKonva | null>(null)
  const trRef = useRef<ITransformer>(null)

  useEffect(() => {
    if (current && trRef?.current && shapeRef.current) {
      trRef?.current?.nodes([shapeRef.current])
    }
  }, [current])

  return (
    <Group>
      <Path {...data} shapeRef={shapeRef} />

      {(current && !isPlaying) && (
        <Transformer
          anchorFill="#d7d7d7dd"
          anchorSize={12}
          rotateAnchorOffset={30}
          borderStrokeWidth={1}
          borderDash={[8, 20]}
          borderStroke='#d7d7d7dd'
          enabledAnchors={[]}
          boundBoxFunc={(oldBox, newBox) => {
            return {
              ...newBox,
              width: oldBox.width,
              height: oldBox.height,
            }
          }}
          ref={trRef}
          rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315, 360]}
        />
      )}
    </Group>
  )
}

Glyph.displayName = 'Component.Glyph'
export default Glyph