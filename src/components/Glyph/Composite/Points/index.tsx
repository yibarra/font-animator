import { Circle, Group } from 'react-konva'

import { UseGlyphContext } from '../../Context'
import BezierCurve from './BezierCurve'
import QuadraticCurve from './QuadraticCurve'
import Mask from './Mask'
import type { IPointProps } from './interfaces'
import { getPoints } from '../../helpers'

const Points = (props: IPointProps) => {
  const { state: { viewPoints }, path: { commands }, updateCommand } = UseGlyphContext()

  if (!viewPoints) {
    return <></>
  }

  return (
    <Group {...props} scaleY={-1}>
      <Mask points={getPoints(commands)} />

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
              <QuadraticCurve
                {...pos}
                args={args}
                key={`${command}-${k}`}
                onChange={(value) => updateCommand(k, { args: value })}
              />
            ) : (
              <BezierCurve
                {...pos}
                args={args}
                key={`${command}-${k}`}
                onChange={(value) => updateCommand(k, { args: value })}
              />
            )
          }

          return (
            <Circle
              {...pos}
              draggable
              onDragMove={(event) => {
                const node = event.target
                
                updateCommand(k, { args: [node.x(), node.y()] })
              }}
              fill="transparent"
              radius={4}
              key={`${command}-${k}`}
              strokeWidth={2}
              stroke="red"
            />
          )
        })}
      </>
    </Group>
  )
}

Points.displayName = 'Components.Glyph.Points'
export default Points