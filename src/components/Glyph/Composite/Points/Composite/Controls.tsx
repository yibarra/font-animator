import type { PathCommand } from 'fontkit'

import { default as Base } from '../index'
import { UseGlyphContext } from '../../../Context'

const Controls = () => {
  const { path: { commands }, updateCommand } = UseGlyphContext()

  const getPrevPos = (prev: PathCommand) => {
    if (!prev) {
      return { x: 0, y: 0 }
    }

    switch (prev.command) {
      case 'moveTo':
      case 'lineTo':
        return { x: prev.args[0], y: prev.args[1] }
      case 'quadraticCurveTo':
        return { x: prev.args[2], y: prev.args[3] }
      case 'bezierCurveTo':
        return { x: prev.args[4], y: prev.args[5] }
      default:
        return { x: 0, y: 0 }
    }
  }

  return (
    <>
      {commands.map(({ command, args }, k) => {
        if (command === 'closePath') {
          return null
        }

        const startPoint = { x: args[0], y: args[1] }

        if (command === 'bezierCurveTo' || command === 'quadraticCurveTo') {
          const prev = getPrevPos(commands[k - 1])
          
          return command === 'quadraticCurveTo' ? (
            <Base.QuadraticCurve
              {...prev}
              args={args}
              key={`${command}-${k}`}
              onChange={(value) => updateCommand(k, { args: value })}
            />
          ) : (
            <Base.BezierCurve
              {...prev}
              args={args}
              key={`${command}-${k}`}
              onChange={(value) => updateCommand(k, { args: value })}
            />
          )
        }

        return (
          <Base.Point
            {...startPoint}
            key={`${command}-${k}`}
            callback={(node) => updateCommand(k, { args: [node.x(), node.y()] })}
          />
        )
      })}
    </>
  )
}

Controls.displayName = 'Glyph.Points.Controls'
export default Controls