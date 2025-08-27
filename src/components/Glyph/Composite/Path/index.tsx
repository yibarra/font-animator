import { Group, Path as PathKonva } from 'react-konva'
import { useEffect, useRef } from 'react'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Group as IGroup } from 'konva/lib/Group'
import type { Path as IPathKonva } from 'konva/lib/shapes/Path'

import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import { default as Base } from '../../index'
import { useGlyphsStore } from '../../../../contexts/Glyphs/store'
import { UseGlyphContext } from '../../Context'
import { useMainStore } from '../../../../contexts/Main/store'
import type { IPath } from './interfaces'

const Path = ({
  current,
  index,
  rotation,
  setPositionDrag,
  ...props
}: IPath) => {
  const shapeRef = useRef<IPathKonva | null>(null)
  const groupRef = useRef<IGroup | null>(null)

  const { setGlyphRotate, setGlyphPosition } = UseGlyphsContext()
  const { config, setCurrent } = useGlyphsStore()

  const { data, state, path } = UseGlyphContext()
  const { setIsDragging } = useMainStore()

  const { id, properties } = data
  const { bounding, path: pathSVG } = path
  const { currentFrame, metrics, skeleton, baseLines } = state

  // on update pos rotate
  const onUpdate = (event: KonvaEventObject<Event>, type?: string) => {
    const { rotation: rotate , x, y } = event.currentTarget.attrs
  
    switch (type) {
      case 'translate':
        setIsDragging(false)
        setGlyphPosition(id, currentFrame, [x, y])
        break

      case 'transform':
        setIsDragging(false)
        setGlyphRotate(id, currentFrame, [x, y], rotate)
        break
      default:
        setPositionDrag([x, y, rotate])
        break
    }
  }

  // center shape
  useEffect(() => {
    if (groupRef.current && bounding) {
      const shape = groupRef.current

      const width = bounding.x2 - bounding.x1
      const height = bounding.y2 - bounding.y1

      const centerX = bounding.x1 + width / 2
      const centerY = bounding.y1 + height / 2

      shape.offsetX(centerX)
      shape.offsetY(centerY)
      
      shape.getLayer()?.batchDraw()
    }
  }, [bounding])

  return (
    <Group
      {...props}
      draggable
      ref={groupRef}
      rotation={rotation}
      onDragStart={() => setIsDragging(true)}
      onTransformStart={() => setIsDragging(true)}
      onDragEnd={(e) => onUpdate(e, 'translate')}
      onDragMove={(e) => onUpdate(e)}
      onTransform={(e) => onUpdate(e)}
      onTransformEnd={(e) => onUpdate(e, 'transform')}
    >
      {current && baseLines && (
        <Base.MetricsLines
          offsetY={-bounding.y2 / 2 + 70}
          width={(bounding.x2 - bounding.x1) + 40}
        />
      )}
      
      <PathKonva
        {...properties}
        {...config.path}
        data={pathSVG}
        offsetY={bounding.y2 / 2 - 70}
        onClick={() => setCurrent(current ? null : index)}
        opacity={skeleton ? 0 : 1}
        ref={shapeRef}
        scaleY={-1}
        shadowOpacity={current ? 0 : 0.4}
      />

      <Base.Skeleton offsetY={bounding.y2 / 2 - 70} />
      <Base.Points offsetY={bounding.y2 / 2 - 70} />

      {skeleton && (
        <Base.ArrowsPoint {...config.arrows} offsetY={bounding.y2 / 2 - 70} />
      )}

      {(current && metrics) && (
        <>
          <Base.Bounding
            {...config.glyph.bounding}
            offsetY={-bounding.y2 / 2 + 40}
          />

          <Base.Bounding
            {...config.glyph.bounding}
            offsetX={40}
            offsetY={-bounding.y2 / 2 + 70}
            vertical
          />
      </>
    )}
    </Group> 
  )
}

Path.displayName = 'Components.Glyph.Path'
export default Path
