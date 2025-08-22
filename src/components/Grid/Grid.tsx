import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as IShape } from 'konva/lib/Shape'

import type { IGridProps } from './interfaces'

const Grid = ({
  cellSize,
  dash = [0, 0],
  height,
  stroke = '#FFF',
  strokeWidth = 1,
  width,
  ...props
}: IGridProps) => {
  const draw = (ctx: Context, shape: IShape) => {
    ctx.clearRect(0, 0, width, height)

    const cols = Math.ceil(width / cellSize)
    const rows = Math.ceil(height / cellSize)
    const centerX = width / 2
    const centerY = height / 2

    ctx.save()
    ctx.translate(centerX, centerY)

    ctx.beginPath()

    ctx.lineWidth = strokeWidth
    ctx.strokeStyle = stroke

    for (let i = -cols; i <= cols; i++) {
      const x = i * cellSize
      ctx.moveTo(x, -height)
      ctx.lineTo(x, height)
    }

    for (let i = -rows; i <= rows; i++) {
      const y = i * cellSize
      ctx.moveTo(-width, y)
      ctx.lineTo(width, y)
      ctx.setLineDash(dash)
    }

    ctx.stroke()

    ctx.restore()
    ctx.strokeShape(shape)
  }

  return (
    <Shape
      {...props}
      listening={false}
      sceneFunc={draw}
      x={0}
      y={0}
    />
  );
}

Grid.displayName = 'Components.Grid'
export default Grid