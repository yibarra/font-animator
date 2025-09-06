import { Rect, Shape } from 'react-konva'

import { useFontStore } from '../../../../contexts/Font/store'
import { UseGlyphContext } from '../../Context'
import type { MetricsLinesProps } from './interfaces'

const MetricsLines = (props: MetricsLinesProps) => {
  const { font } = useFontStore()
  const { factor, path: { bounding: { x1, x2 }} } = UseGlyphContext()

  const { ascender, baseLine, capHeight, descender, xHeight } = factor

  if (!font) {
    return null
  }

  const lines: { y: number; label: string }[] = [
    { y: baseLine, label: 'Baseline' },
    { y: -descender, label: 'Descender' },
    { y: xHeight, label: `x-Height${capHeight === xHeight ? ' / Cap Height' : ''}` },
    { y: ascender, label: 'Ascender' },
  ]

  if (capHeight !== xHeight) {
    lines.push({ y: capHeight, label: 'Caps' })
  }

  return (
    <>
      <Rect
        listening={false}
        fill="red"
        offsetY={descender}
        height={(ascender + descender)}
        opacity={0.1}
        offsetX={-x1}
        width={(x2 - x1)}
      />

      <Shape
        {...props}
        offsetX={-x1}
        sceneFunc={(ctx) => {
          ctx.setLineDash([5, 5])
          ctx.strokeStyle = '#fff'
          ctx.fillStyle = '#fff'
          ctx.lineWidth = 0.5
          ctx.font = '9px Roboto Mono'

          for (const line of lines) {
            ctx.beginPath()
            ctx.moveTo(0, line.y)
            ctx.lineTo((x2 - x1), line.y)
            ctx.stroke()
            ctx.fillText(line.label, 0, line.y + 12)
          }
        }}
      />
    </>
  )
}

MetricsLines.displayName = 'Components.Glyph.MetricsLines'
export default MetricsLines
