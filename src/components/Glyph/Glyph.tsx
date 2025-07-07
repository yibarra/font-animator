import { useEffect, useRef } from 'react'
import { Group, Transformer } from 'react-konva'
import type { Path as IPathKonva } from 'konva/lib/shapes/Path'
import type { Transformer as ITransformer } from 'konva/lib/shapes/Transformer'

import Path from './Composite/Path'
import type { IGlyphProps } from './interfaces'

const Glyph = ({ data, isPlaying }: IGlyphProps) => {
  const shapeRef = useRef<IPathKonva | null>(null)
  const trRef = useRef<ITransformer>(null)

  useEffect(() => {
    if (trRef?.current && shapeRef.current) {
      trRef?.current?.nodes([shapeRef.current])
    }
  }, [])

  return (
    <Group>
      <Path {...data} shapeRef={shapeRef} />

      {(!isPlaying) && (
        <Transformer
          anchorFill="transparent"
          anchorSize={12}
          opacity={0}
          rotateAnchorOffset={24}
          borderStrokeWidth={0}
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