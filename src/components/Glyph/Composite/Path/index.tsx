import { Group, Path as PathKonva } from 'react-konva'
import { useEffect } from 'react'
import type { KonvaEventObject } from 'konva/lib/Node'

import { UseGlyphsContext } from '../../../../contexts/Glyphs'
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
  const { setGlyphRotate, setGlyphPosition } = UseGlyphsContext()
  const { config, setCurrent } = useGlyphsStore()

  const { data, groupRef, shapeRef, state, path } = UseGlyphContext()
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
  }, [bounding, groupRef])

  return (
    <Group
      {...props}
      draggable={current}
      ref={groupRef}
      rotation={rotation}
      onDragStart={() => setIsDragging(true)}
      onTransformStart={() => setIsDragging(true)}
      onDragEnd={(event) => onUpdate(event, 'translate')}
      onDragMove={(event) => onUpdate(event)}
      onTransform={(event) => onUpdate(event)}
      onTransformEnd={(event) => onUpdate(event, 'transform')}
    >      
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

      {(current) && (
        <>
          {baseLines && (
            <Base.MetricsLines
              offsetX={-bounding.x1}
              offsetY={-bounding.y2 / 2 + 70}
              width={(bounding.x2 - bounding.x1)}
            />
          )}

          {metrics && (
            <>
              <Base.Bounding
                {...config.glyph.bounding}
                offsetY={-bounding.y2 / 2 + 40}
              />

              <Base.Bounding
                {...config.glyph.bounding}
                offsetX={20}
                offsetY={-bounding.y2 / 2 + 70}
                vertical
              />
            </>
          )}
        </>
      )}

      {skeleton && (
        <Base.ArrowsPoint {...config.arrows} offsetY={bounding.y2 / 2 - 70} />
      )}
    </Group> 
  )
}

Path.displayName = 'Components.Glyph.Path'
export default Path
