import type { PathCommand } from 'fontkit'

import type { IGlyphPoint } from '../../contexts/Glyphs/interfaces'

// line cut fraction radius
export const adjustedLine = (args: number[], offset: number) => {
  const [x1, y1, x2, y2] = args

  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx*dx + dy*dy)

  if(len === 0) return [x1, y1, x2, y2]

  const factor = offset / len

  return [
    x1 + dx * factor,
    y1 + dy * factor,
    x2 - dx * factor,
    y2 - dy * factor
  ]
}

// get glyph points
export const getPoints = (commands: PathCommand[]): IGlyphPoint[] => {
  const points: IGlyphPoint[] = []

  commands.forEach((cmd) => {
    switch (cmd.command) {
      case 'moveTo':
      case 'lineTo':
        points.push({ x: cmd.args[0], y: cmd.args[1], type: 'on-curve', })
        break
      case 'quadraticCurveTo':
        points.push({
          x: cmd.args[0],
          y: cmd.args[1],
          type: 'control',
        })

        points.push({
          x: cmd.args[2],
          y: cmd.args[3],
          type: 'on-curve',
        })
        break
      case 'bezierCurveTo':
        points.push({
          x: cmd.args[0],
          y: cmd.args[1],
          type: 'control',
        })

        points.push({
          x: cmd.args[2],
          y: cmd.args[3],
          type: 'control',
        })
        
        points.push({
          x: cmd.args[4],
          y: cmd.args[5],
          type: 'on-curve',
        })
        break
      case 'closePath':
        break // closePath doesn't add new points, it just closes the path.
      default:
        console.warn('Unknown fontkit path command type for point extraction:', cmd.command)
    }
  })

  return points
}