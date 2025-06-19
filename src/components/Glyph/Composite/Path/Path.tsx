import { Path as PathKonva } from 'react-konva'
import type { Shape } from 'konva/lib/Shape'

import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import type { IPath } from './interfaces'

const Path = ({ charIndex,  frame, shapeRef, onUpdateTransform }: IPath) => {
  const { getPathDataAndPointsForGlyph } = UseFontSettingsContext()

  const numericAxes = Object.fromEntries(
    Object.entries(frame.axes).map(([key, value]) => [key, Number(value)])
  )

  const { path } = getPathDataAndPointsForGlyph(
      charIndex, numericAxes,
      Number(frame.properties?.fontSize ?? 12)
    )

  return (
    <PathKonva
      {...frame.properties}
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