import type { Context } from 'konva/lib/Context'
import type { Shape as IShape } from 'konva/lib/Shape'
import { Shape } from 'react-konva'

interface IBorder {
  radius: number
  rotation: number
  x: number
  y: number
}

const Border = ({ radius, rotation, x, y }: IBorder) => {
  const draw = (
    ctx: Context,
    shape: IShape
  ) => {
    const safeDegrees = ((rotation % 360) + 360) % 360
    const progress = (safeDegrees / 360) * 100

    const startAngle = -Math.PI / 2 // -90°
    const totalAngle = 2 * Math.PI
    const angleProgress = (progress / 100) * totalAngle

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate((-rotation * Math.PI) / 180)

    ctx.beginPath()

    if (progress <= 50) {
      ctx.arc(0, 0, radius, startAngle, startAngle + angleProgress)
    } else {
      ctx.arc(0, 0, radius, startAngle, startAngle + angleProgress, true)
    }

    ctx.lineWidth = 2
    ctx.strokeStyle = '#e3e9f9'
    ctx.stroke()
    ctx.closePath()

    // Inner ring
    ctx.beginPath()
    ctx.arc(0, 0, radius - 3, startAngle, startAngle + totalAngle)
    ctx.lineWidth = 0.5
    ctx.strokeStyle = '#e3e9f9'
    ctx.stroke()
    ctx.closePath()

    ctx.rotate((rotation * Math.PI) / 180)
    ctx.font = '14px Roboto Mono'
    ctx.fillStyle = '#e3e9f9'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'bottom'

    const rotationNormalize = 360 - Math.round((((rotation + 90) % 360) + 360) % 360)

    ctx.fillText(`${rotationNormalize === 360 ? 0 : rotationNormalize}°`, 55, radius)

    ctx.restore()

    ctx.strokeShape(shape)
  }

  return <Shape sceneFunc={draw} />
}

Border.displayName = 'Components.Glyph.Progress.Border'
export default Border
