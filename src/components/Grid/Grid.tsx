import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as IShape } from 'konva/lib/Shape'

interface GridProps {
  offsetX: number;
  offsetY: number;
  cellSize: number; // Tu 'step' ahora es 'cellSize'
  gridColor: string; // Tu '#888' ahora es 'gridColor'
}

const Grid = ({ cellSize, gridColor }: GridProps) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const draw = (ctx: Context, shape: IShape) => {
    ctx.clearRect(0, 0, width, height)

    const cols = Math.ceil(width / cellSize)
    const rows = Math.ceil(height / cellSize)
    const centerX = width / 2
    const centerY = height / 2

    ctx.save()
    ctx.translate(centerX, centerY) // Mueve (0,0) al centro del canvas

    ctx.beginPath()
    ctx.lineWidth = 0.5
    ctx.strokeStyle = gridColor

    // Líneas verticales
    for (let i = -cols; i <= cols; i++) {
      const x = i * cellSize
      ctx.moveTo(x, -height)
      ctx.lineTo(x, height)
    }

    // Líneas horizontales
    for (let i = -rows; i <= rows; i++) {
      const y = i * cellSize
      ctx.moveTo(-width, y)
      ctx.lineTo(width, y)
      ctx.setLineDash([4, 4])
    }

    ctx.stroke()

    ctx.restore()
    ctx.strokeShape(shape)
  }

  return (
    <Shape
      listening={false}
      sceneFunc={draw}
      opacity={0.2}
      x={0}
      y={0}
    />
  );
}

Grid.displayName = 'Components.Grid'
export default Grid