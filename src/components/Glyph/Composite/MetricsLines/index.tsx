import { Rect, Shape } from 'react-konva'

import { UseGlyphContext } from '../../Context'
import type { MetricsLinesProps } from './interfaces'

const MetricsLines = ({
  dash = [0, 0],
  fill,
  fontFamily,
  fontSize,
  letterSpacing,
  stroke,
  ...props
}: MetricsLinesProps) => {
  const {
    factor: { ascender, baseLine, capHeight, descender, xHeight },
    path: { bounding: { x1, x2 }}
  } = UseGlyphContext()

  const lines: { y: number; label: string }[] = [
    { y: baseLine, label: 'Baseline' },
    { y: -descender, label: 'Descender' },
    { y: xHeight, label: `x-Height${capHeight === xHeight ? ' / Cap Height' : ''}` },
    { y: ascender, label: 'Ascender' },
  ]

  if (capHeight !== xHeight) {
    lines.push({ y: capHeight, label: 'Caps' })
  }

  const width = (x2 - x1) // width

  return (
    <>
      <Rect
        fill="red"
        height={(ascender + descender)}
        listening={false}
        offsetX={-x1}
        offsetY={descender}
        opacity={0.1}
        width={width}
      />

      <Shape
        {...props}
        offsetX={-x1}
        sceneFunc={(ctx) => {
          ctx.setLineDash(dash)
          ctx.fillStyle = fill ?? '#fff'
          ctx.strokeStyle = stroke ?? '#fff'
          ctx.letterSpacing = `${letterSpacing ?? 0}px`

          for (const line of lines) {
            ctx.beginPath()
            ctx.moveTo(0, line.y)
            ctx.lineTo(width, line.y)
            ctx.stroke()

            ctx.font = `${fontSize}px ${fontFamily}`
            ctx.fillText(line.label, 0, line.y + (fontSize ?? 0) * 2)
          }
        }}
      />
    </>
  )
}

MetricsLines.displayName = 'Components.Glyph.MetricsLines'
export default MetricsLines
