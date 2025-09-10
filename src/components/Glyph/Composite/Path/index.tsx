import { Group, Path as PathKonva } from 'react-konva'
import { useEffect } from 'react'
import type { KonvaEventObject } from 'konva/lib/Node'

import { UseGlyphsContext } from '../../../../contexts/Glyphs'
import { UseGlyphContext } from '../../Context'
import { useGlyphsStore } from '../../../../contexts/Glyphs/store'
import { useMainStore } from '../../../../contexts/Main/store'
import { default as Base } from '../../index'
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
  const { isDragging, setIsDragging } = useMainStore()

  const { id } = data
  const {
    bounding: { x1, x2, y1, y2 },
    path: pathSVG
  } = path
  const { currentFrame, metrics, skeleton } = state

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
    if (groupRef.current) {
      const shape = groupRef.current

      const width = x2 - x1
      const height = y2 - y1

      const centerX = x1 + width / 2
      const centerY = y1 + height / 2

      shape.offsetX(centerX)
      shape.offsetY(centerY)
      
      shape.getLayer()?.batchDraw()
    }
  }, [x1, x2, y1, y2, groupRef])

  const offsetY = (((y2 - y1) / 2) - 40)

  return (
    <Group
      {...props}
      draggable
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
        {...config.path}
        data={pathSVG}
        onClick={() => setCurrent(current ? null : index)}
        opacity={skeleton ? 0 : 1}
        ref={shapeRef}
        offsetY={offsetY}
        scaleY={-1}
        shadowOpacity={current ? 0 : 0.4}
      />

      {skeleton && (
        <>
          <Base.Skeleton offsetY={offsetY} />
          <Base.ArrowsPoint {...config.arrows} offsetY={offsetY} />
        </>
      )}

      {metrics && !isDragging && (
        <>
          <Base.MetricsLines {...config.glyph.metrics} offsetY={-offsetY} />
          <Base.Bounding {...config.glyph.bounding} offsetY={-offsetY} />
          <Base.Bounding {...config.glyph.bounding} offsetY={-offsetY} vertical />
        </>
      )}

      <Base.Points offsetY={offsetY} scaleY={-1} />

      <Base.InfoGlyph {...props} rotation={rotation} />
    </Group> 
  )
}

Path.displayName = 'Components.Glyph.Path'
export default Path
