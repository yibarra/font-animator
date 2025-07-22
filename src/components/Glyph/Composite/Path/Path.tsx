import { Group, Path as PathKonva, Shape } from 'react-konva'
import { useEffect, useRef } from 'react'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Group as IGroup } from 'konva/lib/Group'

import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import { default as Base } from '../../index'
import type { IPath } from './interfaces'
import { UseFontContext } from '../../../../contexts/Font/Font'

const Path = ({
  charIndex,
  current,
  id,
  index,
  axes,
  skeleton,
  shapeRef,
  rotation,
  properties,
  setIsDragging,
  setPositionDrag,
  ...props
}: IPath) => {
  const groupRef = useRef<IGroup | null>(null)

  const { font } = UseFontContext()
  const { getPathDataGlyph } = UseFontSettingsContext()
  const { setCurrent, setGlyphRotate, setGlyphPosition } = UseGlyphsContext()

  const scale = properties.fontSize / (font?.unitsPerEm || 1000)

  const numericAxes = Object.fromEntries(
    Object.entries(axes).map(([key, value]) => [key, Number(value)])
  )

  const { arrows, bounding, path, points } = getPathDataGlyph(
    charIndex,
    numericAxes,
    properties.fontSize ?? 12
  )
  
  const onUpdateTranslate = (event: KonvaEventObject<DragEvent>) => {
    const node = event.target
    const x = node.x()
    const y = node.y()

    setIsDragging(false)
    setGlyphPosition(id, 0, [x, y])
  }

  const onUpdateTransform = (event: KonvaEventObject<DragEvent>) => {
    const { rotation, x, y } = event.target.attrs

    setIsDragging(false)
    setGlyphRotate(id, 0, [x, y], rotation)
  }

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
      onClick={() => setCurrent(current ? null : index)}
      onDragStart={() => setIsDragging(true)}
      onTransformStart={() => setIsDragging(true)}
      onDragMove={(event) => {
        const node = event.target
        const x = node.x()
        const y = node.y()
        const rotation = node.rotation()

        setPositionDrag([x, y, rotation])
      }}
      onDragEnd={onUpdateTranslate}
      onTransform={(event) => {
        const node = event.target
        const x = node.x()
        const y = node.y()
        const rotation = node.rotation()
        setPositionDrag([x, y, rotation])
      }}
      onTransformEnd={onUpdateTransform}
    >
      <Base.FontMetricsLines
        path={path}
        fontSize={properties.fontSize}
        rotation={0}
        x={0}
        y={0}
        width={(bounding.x2 - bounding.x1) + 40}
      />
      
      <PathKonva
        {...properties}
        data={path}
        ref={shapeRef}
        scaleY={-1}
        shadowColor="#0f1d44"
        shadowOffset={{ x: 0, y: -4 }}
        shadowBlur={4}
        shadowOpacity={0.4}
        shadowEnabled
        opacity={skeleton ? 0 : 1}
      />

      {skeleton && (
        <>
          <Base.Skeleton points={points} />
          <Base.Points points={points} />
        </>
      )}

      <Base.Bounding
        arrowHeight={4}
        arrowWidth={6}
        bounding={bounding}
        properties={{
          fill: '#e3e9f9',
          stroke: '#e3e9f9',
          strokeWidth: 0.5,
          offsetY: -40,
        }}
      />

      <Base.Bounding
        arrowHeight={4}
        arrowWidth={6}
        bounding={bounding}
        properties={{
          fill: '#e3e9f9',
          stroke: '#e3e9f9',
          strokeWidth: 0.5,
          offsetX: 40,
        }}
        vertical
      />

      <Shape
        scaleY={-1}
        sceneFunc={(ctx) => {
          const arrowLength = 10
          const arrowAperture = 8

          arrows.forEach(([x1, y1, x2, y2]) => {
            x1 *= scale
            y1 *= scale
            x2 *= scale
            y2 *= scale

            const dx = x2 - x1
            const dy = y2 - y1
            const segmentLength = Math.sqrt(dx * dx + dy * dy)

            if (segmentLength === 0) return

            const unitx = dx / segmentLength
            const unity = dy / segmentLength

            const basex = x2 - arrowLength * unitx
            const basey = y2 - arrowLength * unity

            const normalx = arrowAperture * unity
            const normaly = -arrowAperture * unitx

            ctx.beginPath()
            ctx.moveTo(x2, y2)
            ctx.lineTo(basex + normalx, basey + normaly)
            ctx.lineTo(basex - normalx, basey - normaly)
            ctx.closePath()
            ctx.fillStyle = '#ffffff'
            ctx.fill()
          })
        }
       }
      />
    </Group>
  )
}

Path.displayName = 'Glyph.Path'
export default Path
