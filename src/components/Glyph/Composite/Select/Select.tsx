import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import { getBoundingBox } from '../../../../contexts/FontSettings/utils'
import type { ISelectProps } from './interfaces'

const Select = ({ cornerWidth = 12, points }: ISelectProps) => {
  const currentBoundingBox = getBoundingBox(points)

  const draw = (context: Context) => {
    if (!currentBoundingBox) {
      return
    }

    const { height, width } = currentBoundingBox

    context.beginPath()
    context.rect(0, 0, width, height)
    context.strokeStyle = 'purple'
    context.lineWidth = 1
    context.stroke()

    // 2. Desenhar as esquinas mais grossas
    context.lineWidth = 6 // Define a largura mais grossa para as esquinas

    // Canto Superior Esquerdo (Top-Left)
    context.beginPath()
    context.moveTo(0, cornerWidth)
    context.lineTo(0, 0)
    context.lineTo(cornerWidth, 0)
    context.strokeStyle = 'yellow'
    context.stroke()

    // Canto Superior Direito (Top-Right)
    context.beginPath()
    context.moveTo(width - cornerWidth, 0)
    context.lineTo(width, 0)
    context.lineTo(width, cornerWidth)
    context.strokeStyle = 'green'
    context.stroke();

    // Canto Inferior Direito (Bottom-Right)
    context.beginPath()
    context.moveTo(width, height - cornerWidth)
    context.lineTo(width, height)
    context.lineTo(width - cornerWidth, height)
    context.strokeStyle = 'red'
    context.stroke()

    // Canto Inferior Esquerdo (Bottom-Left)
    context.beginPath();
    context.moveTo(cornerWidth, height)
    context.lineTo(0, height)
    context.lineTo(0, height - cornerWidth)
    context.strokeStyle = 'orange'
    context.stroke()
  }

  return (
    <Shape
      x={0}
      y={0}
      sceneFunc={draw}
    />
  )
}

Select.displayName = 'Components.Glyph.Select'
export default Select
