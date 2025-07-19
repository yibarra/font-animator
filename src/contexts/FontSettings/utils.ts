import type { PathCommand } from 'fontkit'
import type { IGlyphPoint } from '../Glyphs/interfaces'
import type { ArrowPoint } from './interfaces'

// convert to svg
export const convertPathToSvg = (commands: PathCommand[], scaleFactor: number): string => {
  let svgData = ''

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

// extract glyph
export const extractGlyphArrows = (commands: PathCommand[]): ArrowPoint[] => {
  const arrows: ArrowPoint[] = []
  let currentSubpathStart: [number, number] | null = null
  let lastPoint: [number, number] | null = null

  commands.forEach((cmd) => {
    switch (cmd.command) {
      case 'moveTo':
        if (lastPoint && currentSubpathStart && (lastPoint[0] !== currentSubpathStart[0] || lastPoint[1] !== currentSubpathStart[1])) {
          arrows.push({ x: lastPoint[0], y: lastPoint[1], type: 'end' })
        }
        
        arrows.push({ x: cmd.args[0], y: cmd.args[1], type: 'start' })
        currentSubpathStart = cmd.args as [number, number]
        lastPoint = cmd.args as [number, number]
        break

      case 'lineTo':
      case 'quadraticCurveTo':
        lastPoint = cmd.args.slice(-2) as [number, number]
        break

      case 'closePath':
        if (currentSubpathStart) {
          arrows.push({ x: currentSubpathStart[0], y: currentSubpathStart[1], type: 'closure' })
        }
        lastPoint = currentSubpathStart
        break
      
      default:
        break
    }
  })

  if (lastPoint && currentSubpathStart && (lastPoint[0] !== currentSubpathStart[0] || lastPoint[1] !== currentSubpathStart[1])) {
    arrows.push({ x: lastPoint[0], y: lastPoint[1], type: 'end' })
  }
  
  return arrows
}

// extract glyph points
export const extractGlyphPoints = (commands: PathCommand[], scaleFactor: number): IGlyphPoint[] => {
  const points: IGlyphPoint[] = []

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
