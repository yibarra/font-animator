import type { KonvaEventObject } from 'konva/lib/Node'
import { Path } from 'react-konva'

import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'

const PathFrame = ({
  axes,
  id,
  charIndex,
  position = [0, 0],
  rotation,
  shapeRef,
  properties,
}: any) => {
  const { getPathDataGlyph } = UseFontSettingsContext()
  const { setGlyphRotate, setGlyphPosition } = UseGlyphsContext()

  const numericAxes = Object.fromEntries(
    Object.entries(axes).map(([key, value]) => [key, Number(value)])
  )

  const { path } = getPathDataGlyph(charIndex, numericAxes, 140)
  
  const onUpdateTranslate = (event: KonvaEventObject<DragEvent>) => {
    const node = event.target
    const x = node.x()
    const y = node.y()

    setGlyphPosition(id, 1, [x, y])
  }

  const onUpdateTransform = (event: KonvaEventObject<DragEvent>) => {
    const { rotation, x, y } = event.target.attrs

    setGlyphRotate(id, 1, [x, y], rotation)
  }

  return (
    <>
      <Path
        {...properties}
        data={path}
        draggable
        onDragEnd={onUpdateTranslate}
        onTransformEnd={onUpdateTransform}
        ref={shapeRef}
        rotation={rotation}
        x={position[0]}
        y={position[1]}
        scaleY={-1}
      />
    </>
  )
}

PathFrame.displayName = 'Components.Glyph.PathFrame'
export default PathFrame