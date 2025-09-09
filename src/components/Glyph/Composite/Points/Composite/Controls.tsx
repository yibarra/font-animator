import { default as Base } from '../index'
import { UseGlyphContext } from '../../../Context'

const Controls = () => {
  const { path: { commands }, updateCommand } = UseGlyphContext()

  return (
    <>
      {Array.isArray(commands) && commands.map(({ command, args }, k) => {
        if (command === 'closePath') {
          return <></>
        }

        const pos = { x: args[0], y: args[1] }

        if (command === 'bezierCurveTo' || command === 'quadraticCurveTo') {
          const prev = commands[k - 1]

          if (prev?.command === "moveTo" || prev?.command === "lineTo") {
            pos.x = prev.args[0]
            pos.y = prev.args[1]
          } else if (prev?.command === "quadraticCurveTo") {
            pos.x = prev.args[2]
            pos.y = prev.args[3]
          } else if (prev?.command === "bezierCurveTo") {
            pos.x = prev.args[4]
            pos.y = prev.args[5]
          }
          
          return command === 'quadraticCurveTo' ? (
            <Base.QuadraticCurve
              {...pos}
              args={args}
              key={`${command}-${k}`}
              onChange={(value) => updateCommand(k, { args: value })}
            />
          ) : (
            <Base.BezierCurve
              {...pos}
              args={args}
              key={`${command}-${k}`}
              onChange={(value) => updateCommand(k, { args: value })}
            />
          )
        }

        return (
          <Base.Point
            {...pos}
            key={`${command}-${k}`}
            callback={(node) => {
              if (node) {
                updateCommand(k, { args: [node.x(), node.y()] })
              }
            }}
          />
        )
      })}
    </>
  )
}

Controls.displayName = 'Glyph.Points.Controls'
export default Controls