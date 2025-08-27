import { Shape } from 'react-konva'

import { useFontStore } from '../../../../contexts/Font/store'
import { UseGlyphContext } from '../../Context'
import type { MetricsLinesProps } from './interfaces'

const MetricsLines = ({ width, ...props }: MetricsLinesProps) => {
  const { font } = useFontStore()
  const { data: { properties: { fontSize }} } = UseGlyphContext()

  if (!font) {
    return null
  }

  const scaleFactor = fontSize / font.unitsPerEm

  const baselineY = 0
  const descenderY = font.descent * scaleFactor
  const xHeightY = - font.xHeight * scaleFactor
  const capHeightY = -font.capHeight * scaleFactor
  const ascenderY = -font.ascent * scaleFactor

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

MetricsLines.displayName = 'Components.Glyph.MetricsLines'
export default MetricsLines
