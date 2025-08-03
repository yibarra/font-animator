import { Group, Shape } from 'react-konva'

import type { FontMetricsLinesProps } from './interfaces'
import { UseFontContext } from '../../../../contexts/Font/Font'

const FontMetricsLines = ({
  fontSize,
  rotation,
  width,
  x,
  y,
}: FontMetricsLinesProps) => {
  const { font } = UseFontContext()

  if (!font) {
    return
  }

  const scaleFactor = fontSize / font.unitsPerEm

  const baselineY = y
  const descenderY = y + (font?.descent * scaleFactor)
  const xHeightY = y - (font?.xHeight * scaleFactor)
  const capHeightY = y - (font?.capHeight * scaleFactor)
  const ascenderY = y - (font?.ascent * scaleFactor)

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
    <Group listening={false} x={x} y={0} rotation={rotation}>
      <Shape
        sceneFunc={(ctx) => {
          ctx.setLineDash([5, 5])
          ctx.strokeStyle = '#fff'
          ctx.fillStyle = '#fff'
          ctx.lineWidth = 0.5
          ctx.font = '10px Roboto Mono'

          for (const line of lines) {
            ctx.beginPath()
            ctx.moveTo(0, line.y)
            ctx.lineTo(width + 20, line.y)
            ctx.stroke()
            ctx.fillText(line.label, width - width, line.y + 18)
          }
        }}
        listening={false}
      />
    </Group>
  )
}

FontMetricsLines.displayName = 'Components.Glyph.FontMetricsLines'
export default FontMetricsLines