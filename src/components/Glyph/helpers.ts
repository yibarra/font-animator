import type { PathCommand } from 'fontkit'

import type { IGlyphPoint } from '../../contexts/Glyphs/interfaces'

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