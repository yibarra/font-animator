import { useEffect, useRef } from 'react'
import { Shape } from 'react-konva'
import type { Shape as IShape } from 'konva/lib/Shape'

import { UseFontContext } from '../../../../contexts/Font/Font'
import type { FontMetricsLinesProps } from './interfaces'
import { Tween, Easings } from 'konva/lib/Tween'

const FontMetricsLines = ({
  fontSize,
  rotation,
  width,
  x,
  y,
  ...props
}: FontMetricsLinesProps) => {
  const { font } = UseFontContext()
  const shapeRef = useRef<IShape>(null)

  useEffect(() => {
    const shape = shapeRef.current

    if (!shape) {
      return
    }

    shape.opacity(0)
    shape.scale({ x: 0.7, y: 1 })

    const tween = new Tween({
      node: shape,
      duration: 0.4,
      easing: Easings.BackEaseOut,
      opacity: 1,
      scaleX: 1,
      scaleY: 1
    })

    tween.play()

    return () => {
      tween.pause()
    }
  }, [])

  if (!font) {
    return null
  }

  const scaleFactor = fontSize / font.unitsPerEm

  const baselineY = y
  const descenderY = y + font.descent * scaleFactor
  const xHeightY = y - font.xHeight * scaleFactor
  const capHeightY = y - font.capHeight * scaleFactor
  const ascenderY = y - font.ascent * scaleFactor

  const lines: { y: number; label: string }[] = [
    { y: baselineY, label: 'Baseline' },
    { y: descenderY, label: 'Descender' },
    { y: xHeightY, label: `x-Height${capHeightY === xHeightY ? ' / Cap Height' : ''}` },
    { y: ascenderY, label: 'Ascender' },
  ]

  if (capHeightY !== xHeightY) {
    lines.push({ y: capHeightY, label: 'Cap Height' })
  }

  return (
    <Shape
      {...props}
      ref={shapeRef}
      x={x}
      y={y}
      rotation={rotation}
      sceneFunc={(ctx) => {
        ctx.setLineDash([5, 5])
        ctx.strokeStyle = '#fff'
        ctx.fillStyle = '#fff'
        ctx.lineWidth = 0.5
        ctx.font = '9px Roboto Mono'

        for (const line of lines) {
          ctx.beginPath()
          ctx.moveTo(0, line.y)
          ctx.lineTo(width, line.y)
          ctx.stroke()
          ctx.fillText(line.label, 0, line.y + 18)
        }
      }}
    />
  )
}

FontMetricsLines.displayName = 'Components.Glyph.FontMetricsLines'
export default FontMetricsLines
