import type { PathCommand } from 'fontkit'
import type { IGlyphPoint } from '../Glyphs/interfaces'

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
export const extractGlyphArrows = (commands: PathCommand[]): number[][] => {
   let startPoint: [number, number] | null = null;
  let endPoint: [number, number] | null = null;

  // Encontrar el primer punto
  for (const cmd of commands) {
    if (cmd.command === 'moveTo' || cmd.command === 'lineTo') {
      startPoint = [cmd.args[0], cmd.args[1]];
      break;
    } else if (cmd.command === 'bezierCurveTo') {
      // Para bezierCurveTo, el punto final es el último par de coordenadas
      startPoint = [cmd.args[4], cmd.args[5]];
      break;
    } else if (cmd.command === 'quadraticCurveTo') {
      // Para quadraticCurveTo, el punto final es el último par de coordenadas
      startPoint = [cmd.args[2], cmd.args[3]];
      break;
    }
  }

  // Encontrar el último punto
  for (let i = commands.length - 1; i >= 0; i--) {
    const cmd = commands[i];
    if (cmd.command === 'moveTo' || cmd.command === 'lineTo') {
      endPoint = [cmd.args[0], cmd.args[1]];
      break;
    } else if (cmd.command === 'bezierCurveTo') {
      endPoint = [cmd.args[4], cmd.args[5]];
      break;
    } else if (cmd.command === 'quadraticCurveTo') {
      endPoint = [cmd.args[2], cmd.args[3]];
      break;
    }
  }

  // Si ambos puntos se encontraron, retornamos el array combinado
  if (startPoint && endPoint) {
    return [[...startPoint, ...endPoint]]
  }

  return []
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
