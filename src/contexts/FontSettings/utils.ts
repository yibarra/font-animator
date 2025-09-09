import type { PathCommand } from 'fontkit'
import type { IGlyphPoint } from '../Glyphs/interfaces'

import type { IArrowsArray, IArrowsProps } from './interfaces'

// extract glyph
export const extractGlyphArrows = (commands: PathCommand[]): IArrowsArray => {
  let startInfo: IArrowsProps | null = null
  let endInfo: IArrowsProps | null = null

  let currentX = 0
  let currentY = 0
  let lastX = 0
  let lastY = 0
  let startOfSubpathX = 0
  let startOfSubpathY = 0

  // Bandera para asegurar que el punto de inicio se establece una vez
  let startPointSet = false

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i]

    // Antes de procesar el comando, guardamos la posición anterior
    lastX = currentX
    lastY = currentY

    switch (command.command) {
      case 'moveTo': {
        currentX = command.args[0]
        currentY = command.args[1]
        startOfSubpathX = currentX // subpath
        startOfSubpathY = currentY

        if (!startPointSet) {
          // El primer moveTo define el punto de inicio.
          // La dirección se inferirá del siguiente comando si lo hay.
          startInfo = { point: { x: currentX, y: currentY }, direction: { x: 0, y: 0 } }
          startPointSet = true
        }

        break
      }

      case 'lineTo': {
        currentX = command.args[0]
        currentY = command.args[1]

        const lineDirX = currentX - lastX
        const lineDirY = currentY - lastY

        if (!startPointSet) {
            // Si por alguna razón el primer comando no fue un moveTo
            // y este es el primer comando de dibujo, lo usamos como inicio.
            // Esto es un caso anómalo para un glifo, pero maneja la situación.
            startInfo = { point: { x: lastX, y: lastY }, direction: { x: lineDirX, y: lineDirY } }
            startPointSet = true
        }
        // Si startInfo.direction aún no está configurada, úsala de este comando
        if (startInfo && startInfo.direction.x === 0 && startInfo.direction.y === 0) {
            startInfo.direction = { x: lineDirX, y: lineDirY }
        }
        endInfo = { point: { x: currentX, y: currentY }, direction: { x: lineDirX, y: lineDirY } }
        break
      }

      case 'bezierCurveTo': { // Curva Bézier cúbica
        const x1_bezier = command.args[0]
        const y1_bezier = command.args[1]
        const x2_bezier = command.args[2]
        const y2_bezier = command.args[3]
        currentX = command.args[4]
        currentY = command.args[5]

        const startDirX_bezier = x1_bezier - lastX
        const startDirY_bezier = y1_bezier - lastY
        const endDirX_bezier = currentX - x2_bezier
        const endDirY_bezier = currentY - y2_bezier
        
        if (!startPointSet) {
            // Similar al lineTo, para el caso anómalo
            startInfo = { point: { x: lastX, y: lastY }, direction: { x: startDirX_bezier, y: startDirY_bezier } }
            startPointSet = true
        }
        if (startInfo && startInfo.direction.x === 0 && startInfo.direction.y === 0) {
            startInfo.direction = { x: startDirX_bezier, y: startDirY_bezier }
        }
        endInfo = { point: { x: currentX, y: currentY }, direction: { x: endDirX_bezier, y: endDirY_bezier } }
        break
      }

      case 'quadraticCurveTo': { // Curva Bézier cuadrática
        const x1_quad = command.args[0]
        const y1_quad = command.args[1]
        currentX = command.args[2]
        currentY = command.args[3]

        const startDirX_quad = x1_quad - lastX
        const startDirY_quad = y1_quad - lastY
        const endDirX_quad = currentX - x1_quad
        const endDirY_quad = currentY - y1_quad

        if (!startPointSet) {
            // Similar al lineTo, para el caso anómalo
            startInfo = { point: { x: lastX, y: lastY }, direction: { x: startDirX_quad, y: startDirY_quad } }
            startPointSet = true
        }
        if (startInfo && startInfo.direction.x === 0 && startInfo.direction.y === 0) {
            startInfo.direction = { x: startDirX_quad, y: startDirY_quad }
        }
        
        endInfo = { point: { x: currentX, y: currentY }, direction: { x: endDirX_quad, y: endDirY_quad } }
        break
      }

      case 'closePath': {
        // closePath current path, return to startOfSubpath
        if (endInfo && (currentX !== startOfSubpathX || currentY !== startOfSubpathY)) {
          const dirX = startOfSubpathX - currentX
          const dirY = startOfSubpathY - currentY

          endInfo = { point: { x: startOfSubpathX, y: startOfSubpathY }, direction: { x: dirX, y: dirY } }
        }

        currentX = startOfSubpathX
        currentY = startOfSubpathY
        break
      }
    }
  }

  // normalize dirs a vectors units
  if (startInfo && (startInfo.direction.x !== 0 || startInfo.direction.y !== 0)) {
    const magnitude = Math.sqrt(startInfo.direction.x**2 + startInfo.direction.y**2)

    startInfo.direction.x /= magnitude
    startInfo.direction.y /= magnitude
  }

  if (endInfo && (endInfo.direction.x !== 0 || endInfo.direction.y !== 0)) {
    const magnitude = Math.sqrt(endInfo.direction.x**2 + endInfo.direction.y**2)

    endInfo.direction.x /= magnitude
    endInfo.direction.y /= magnitude
  }

  return [startInfo, endInfo]
}

// extract glyph points
export const extractGlyphPoints = (commands: PathCommand[]): IGlyphPoint[] => {
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

// svg 
export const pathToSvg = (commands: PathCommand[]): string => {
  return commands
    .map(({ command, args }) => {
      switch (command) {
        case "moveTo":
          return `M ${args.join(" ")}`
        case "lineTo":
          return `L ${args.join(" ")}`
        case "quadraticCurveTo":
          return `Q ${args.join(" ")}`
        case "bezierCurveTo":
          return `C ${args.join(" ")}`
        case "closePath":
          return "Z"
        default:
          return ""
      }
    })
    .join(" ")
}

// update command
export const updateCommand = (
  commands: PathCommand[],
  index: number,
  newCommand: Partial<PathCommand>
): PathCommand[] => (
  commands.map((cmd, i) =>
    i === index ? { ...cmd, ...newCommand } : cmd
  )
)