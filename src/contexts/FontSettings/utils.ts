import type { PathCommand } from 'fontkit'
import type { BoundingBox, IGlyphPoint } from '../Glyphs/interfaces'

// convert to svg
export const convertPathToSvg = (commands: PathCommand[], fontSize: number, unitsPerEm: number): string => {
  let svgData = ''
  
  const scaleFactor = fontSize / unitsPerEm

  commands.forEach((cmd) => {
    switch (cmd.command) {
      case 'moveTo':
        svgData += `M${cmd.args[0] * scaleFactor},${cmd.args[1] * scaleFactor} `
        break
      case 'lineTo':
        svgData += `L${cmd.args[0] * scaleFactor},${cmd.args[1] * scaleFactor} `
        break
      case 'quadraticCurveTo':
        svgData += `Q${cmd.args[0] * scaleFactor},${cmd.args[1] * scaleFactor} ${cmd.args[2] * scaleFactor},${cmd.args[3] * scaleFactor} `
        break
      case 'bezierCurveTo':
        svgData += `C${cmd.args[0] * scaleFactor},${cmd.args[1] * scaleFactor} ${cmd.args[2] * scaleFactor},${cmd.args[3] * scaleFactor} ${cmd.args[4] * scaleFactor},${cmd.args[5] * scaleFactor} `
        break
      case 'closePath':
        svgData += 'Z '
        break
      default:
    }
  })
  
  return svgData.trim()
}

// extract glyph points
export const extractGlyphPoints = (commands: PathCommand[], fontSize: number, unitsPerEm: number): IGlyphPoint[] => {
  const points: IGlyphPoint[] = []
  const scaleFactor = fontSize / unitsPerEm

  commands.forEach((cmd: PathCommand) => {
    switch (cmd.command) {
      case 'moveTo':
      case 'lineTo':
        points.push({
          x: cmd.args[0] * scaleFactor,
          y: cmd.args[1] * scaleFactor,
          type: 'on-curve',
        })
        break
      case 'quadraticCurveTo':
        points.push({
          x: cmd.args[0] * scaleFactor,
          y: cmd.args[1] * scaleFactor,
          type: 'control',
        })

        points.push({
          x: cmd.args[2] * scaleFactor,
          y: cmd.args[3] * scaleFactor,
          type: 'on-curve',
        })
        break
      case 'bezierCurveTo':
        points.push({
          x: cmd.args[0] * scaleFactor,
          y: cmd.args[1] * scaleFactor,
          type: 'control',
        })

        points.push({
          x: cmd.args[2] * scaleFactor,
          y: cmd.args[3] * scaleFactor,
          type: 'control',
        })
        
        points.push({
          x: cmd.args[4] * scaleFactor,
          y: cmd.args[5] * scaleFactor,
          type: 'on-curve',
        })
        break
      case 'closePath':
        // closePath doesn't add new points, it just closes the path.
        break
      default:
        console.warn('Unknown fontkit path command type for point extraction:', cmd.command)
    }
  })

  return points
}

// get bounding box
export const getBoundingBox = (points: IGlyphPoint[]): BoundingBox | null => {
  if (points.length === 0) {
    return null
  }

  let minX = points[0].x
  let minY = points[0].y
  let maxX = points[0].x
  let maxY = points[0].y

  // find min/max
  points.forEach(point => {
    minX = Math.min(minX, point.x)
    minY = Math.min(minY, point.y)
    maxX = Math.max(maxX, point.x)
    maxY = Math.max(maxY, point.y)
  })

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: Math.round(maxX - minX),
    height: Math.round(maxY - minY),
  }
}
