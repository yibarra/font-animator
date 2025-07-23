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
export const extractGlyphArrows = (commands: PathCommand[], scaleFactor: number): any => {
  let startInfo: { point: any; direction: any } | null = null;
  let endInfo: { point: any; direction: any } | null = null;

  let currentX = 0;
  let currentY = 0;
  let lastX = 0;
  let lastY = 0;
  let startOfSubpathX = 0;
  let startOfSubpathY = 0;

  // Bandera para asegurar que el punto de inicio se establece una vez
  let startPointSet = false;

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];

    // Antes de procesar el comando, guardamos la posición anterior
    lastX = currentX * scaleFactor;
    lastY = currentY * scaleFactor;

    switch (command.command) {
      case 'moveTo': {
        currentX = command.args[0] * scaleFactor;
        currentY = command.args[1] * scaleFactor;
        startOfSubpathX = currentX; // Reinicia el inicio del subpath
        startOfSubpathY = currentY;

        if (!startPointSet) {
          // El primer moveTo define el punto de inicio.
          // La dirección se inferirá del siguiente comando si lo hay.
          startInfo = { point: { x: currentX, y: currentY }, direction: { x: 0, y: 0 } };
          startPointSet = true;
        }
        break;
      }

      case 'lineTo': {
        currentX = command.args[0] * scaleFactor;
        currentY = command.args[1] * scaleFactor;

        const lineDirX = currentX - lastX;
        const lineDirY = currentY - lastY;

        if (!startPointSet) {
            // Si por alguna razón el primer comando no fue un moveTo
            // y este es el primer comando de dibujo, lo usamos como inicio.
            // Esto es un caso anómalo para un glifo, pero maneja la situación.
            startInfo = { point: { x: lastX, y: lastY }, direction: { x: lineDirX, y: lineDirY } };
            startPointSet = true;
        }
        // Si startInfo.direction aún no está configurada, úsala de este comando
        if (startInfo && startInfo.direction.x === 0 && startInfo.direction.y === 0) {
            startInfo.direction = { x: lineDirX, y: lineDirY };
        }
        endInfo = { point: { x: currentX, y: currentY }, direction: { x: lineDirX, y: lineDirY } };
        break;
      }

      case 'bezierCurveTo': { // Curva Bézier cúbica
        const x1_bezier = command.args[0] * scaleFactor;
        const y1_bezier = command.args[1] * scaleFactor;
        const x2_bezier = command.args[2] * scaleFactor;
        const y2_bezier = command.args[3] * scaleFactor;
        currentX = command.args[4] * scaleFactor;
        currentY = command.args[5] * scaleFactor;

        const startDirX_bezier = x1_bezier - lastX;
        const startDirY_bezier = y1_bezier - lastY;
        const endDirX_bezier = currentX - x2_bezier;
        const endDirY_bezier = currentY - y2_bezier;
        
        if (!startPointSet) {
            // Similar al lineTo, para el caso anómalo
            startInfo = { point: { x: lastX, y: lastY }, direction: { x: startDirX_bezier, y: startDirY_bezier } };
            startPointSet = true;
        }
        if (startInfo && startInfo.direction.x === 0 && startInfo.direction.y === 0) {
            startInfo.direction = { x: startDirX_bezier, y: startDirY_bezier };
        }
        endInfo = { point: { x: currentX, y: currentY }, direction: { x: endDirX_bezier, y: endDirY_bezier } };
        break;
      }

      case 'quadraticCurveTo': { // Curva Bézier cuadrática
        const x1_quad = command.args[0] * scaleFactor;
        const y1_quad = command.args[1] * scaleFactor;
        currentX = command.args[2] * scaleFactor;
        currentY = command.args[3] * scaleFactor;

        const startDirX_quad = x1_quad - lastX;
        const startDirY_quad = y1_quad - lastY;
        const endDirX_quad = currentX - x1_quad;
        const endDirY_quad = currentY - y1_quad;

        if (!startPointSet) {
            // Similar al lineTo, para el caso anómalo
            startInfo = { point: { x: lastX, y: lastY }, direction: { x: startDirX_quad, y: startDirY_quad } };
            startPointSet = true;
        }
        if (startInfo && startInfo.direction.x === 0 && startInfo.direction.y === 0) {
            startInfo.direction = { x: startDirX_quad, y: startDirY_quad };
        }
        endInfo = { point: { x: currentX, y: currentY }, direction: { x: endDirX_quad, y: endDirY_quad } };
        break;
      }

      case 'closePath': {
        // closePath cierra el subpath actual, volviendo al startOfSubpath
        if (endInfo && (currentX !== startOfSubpathX || currentY !== startOfSubpathY)) {
          const dirX = startOfSubpathX - currentX;
          const dirY = startOfSubpathY - currentY;
          endInfo = { point: { x: startOfSubpathX, y: startOfSubpathY }, direction: { x: dirX, y: dirY } };
        }
        currentX = startOfSubpathX;
        currentY = startOfSubpathY;
        break;
      }
    }
  }

  // Normalizar las direcciones a vectores unitarios
  if (startInfo && (startInfo.direction.x !== 0 || startInfo.direction.y !== 0)) {
    const magnitude = Math.sqrt(startInfo.direction.x**2 + startInfo.direction.y**2);
    startInfo.direction.x /= magnitude;
    startInfo.direction.y /= magnitude;
  }
  if (endInfo && (endInfo.direction.x !== 0 || endInfo.direction.y !== 0)) {
    const magnitude = Math.sqrt(endInfo.direction.x**2 + endInfo.direction.y**2);
    endInfo.direction.x /= magnitude;
    endInfo.direction.y /= magnitude;
  }

  return { start: startInfo, end: endInfo };
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
