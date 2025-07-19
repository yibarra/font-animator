import { Group, Line, Text } from 'react-konva'

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

  const lineProps = {
    stroke: '#FFF',
    strokeWidth: 0.5,
    dash: [5, 5],
  }

  const labelProps = {
    fontSize: 10,
    fill: '#FFF',
    fontFamily: 'Roboto Mono',
  }

  return (
    <Group listening={false} x={x} y={0} rotation={rotation}>
      <Line points={[0, baselineY, width, baselineY]} {...lineProps} />
      <Text x={width + 12} y={baselineY - 7} text="Baseline" {...labelProps} />

      <Line points={[0, descenderY, width, descenderY]} {...lineProps} />
      <Text x={width + 12} y={descenderY - 7} text="Descender" {...labelProps} />

      <Line points={[0, xHeightY, width, xHeightY]} {...lineProps} />
      <Text
        {...labelProps}
        text={`x-Height ${capHeightY === xHeightY ? 'Cap Height' : ''}`}
        x={width + 12}
        y={xHeightY - 7}
      />

      {(capHeightY !== xHeightY) && (
        <>
          <Line points={[0, capHeightY, width, capHeightY]} {...lineProps} />
          <Text x={width + 12} y={capHeightY - 7} text="Cap Height" {...labelProps} />
        </>
      )}

      <Line points={[0, ascenderY, width, ascenderY]} {...lineProps} />
      <Text x={width + 12} y={ascenderY - 7} text="Ascender" {...labelProps} />

    </Group>
  )
}

FontMetricsLines.displayName = 'Components.Glyph.FontMetricsLines'
export default FontMetricsLines