import { Path as PathKonva } from 'react-konva'
import type { Shape } from 'konva/lib/Shape'

import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import type { IPath } from './interfaces'

const Path = ({
  charIndex,
  axes,
  shapeRef,
  onUpdateTransform,
  properties
}: IPath) => {
  const { getPathDataGlyph } = UseFontSettingsContext()

  const numericAxes = Object.fromEntries(
    Object.entries(axes).map(([key, value]) => [key, Number(value)])
  )

  const path = getPathDataGlyph(
    charIndex,
    numericAxes,
    140
  )

  return (
    <PathKonva
      {...properties}
      data={path}
      ref={shapeRef}
      onTransformEnd={() => {
        const node = shapeRef?.current as Shape | null

        if (node) {
          // const scaleX = node.scaleX()
          // const scaleY = node.scaleY()
          onUpdateTransform(node.rotation())

          // x: node.x(),
          // y: node.y(),
        }
      }}
    />
  )
}

Path.displayName = 'Glyph.Path'
export default Path
