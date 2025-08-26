import { Shape } from 'react-konva'
import { useEffect, useRef } from 'react'
import type { Context } from 'konva/lib/Context'
import type { Shape as IShape } from 'konva/lib/Shape'

import { Easings, Tween } from 'konva/lib/Tween'
import type { IBounding } from './interfaces'

const Bounding = ({ arrowHeight, arrowWidth, bounding, properties, vertical }: IBounding) => {
  const shapeRef = useRef<IShape>(null)

  // text
  const drawText = (ctx: Context, text: string, x: number, y: number, rotate = false) => {
    const { width } = ctx.measureText(text)

    ctx.font = '10px Roboto Mono'
    ctx.fillStyle = properties.fill ?? '#FFF'
    ctx.textBaseline = 'bottom'

    if (rotate) {
      ctx.save()
      ctx.translate(x, y + width / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.fillText(text, 0, 0)
  
      ctx.restore()
    } else {
      ctx.fillText(text, (x - width) / 2, y)
    }
  }

  // box arrows
  const drawBox = (ctx: Context, shape: IShape) => {
    ctx.beginPath()

    const { x1, x2, y1 } = bounding

    ctx.moveTo(x1, y1)
    ctx.lineTo(x1 + arrowHeight, y1 - arrowWidth / 2)
    ctx.lineTo(x1 + arrowHeight, y1 + arrowWidth / 2)
    ctx.closePath()

    ctx.lineTo(x2, y1)

    ctx.lineTo(x2 - arrowHeight, y1 - arrowWidth / 2)
    ctx.lineTo(x2 - arrowHeight, y1 + arrowWidth / 2)
    ctx.lineTo(x2, y1)
    ctx.closePath()

    ctx.moveTo(x1, y1 - arrowHeight)
    ctx.lineTo(x1, y1 + arrowHeight)
    ctx.closePath()

    ctx.moveTo(x2, y1 - arrowHeight)
    ctx.lineTo(x2, y1 + arrowHeight)
    ctx.closePath()

    drawText(ctx, `${Math.round(x2 - x1)}px`, (x1 + x2), y1 + 20)

    ctx.fillShape(shape)
    ctx.strokeShape(shape)
  }

  // box vertical
  const drawVerticalBox = (ctx: Context, shape: IShape) => {
    ctx.beginPath()

    const { x1, y1, y2 } = bounding

    ctx.moveTo(x1, y1)
    ctx.lineTo(x1 + arrowWidth / 2, y1 - arrowHeight)
    ctx.lineTo(x1 - arrowWidth / 2, y1 - arrowHeight)
    ctx.closePath()

    ctx.moveTo(x1, y1)
    ctx.lineTo(x1, y2)
    ctx.closePath()

    ctx.moveTo(x1, y2)
    ctx.lineTo(x1 + arrowWidth / 2, y2 + arrowHeight)
    ctx.lineTo(x1 - arrowWidth / 2, y2 + arrowHeight)
    ctx.closePath()

    ctx.moveTo(x1 - arrowHeight, y1)
    ctx.lineTo(x1 + arrowHeight, y1)
    ctx.closePath()

    ctx.moveTo(x1 - arrowHeight, y2)
    ctx.lineTo(x1 + arrowHeight, y2)
    ctx.closePath()

    drawText(ctx, `${Math.round(y1 - y2)}px`, x1 - 10, y2 / 2, true)

    ctx.fillShape(shape)
    ctx.strokeShape(shape)
  }

  useEffect(() => {
    const shape = shapeRef.current

    if (!shape) {
      return
    }

    if (vertical) {
      shape.scale({ x: 1, y: 1.2 })
    } else {
      shape.scale({ x: 1.2, y: 1 })
    }

    shape.opacity(0)

    const tween = new Tween({
      node: shape,
      duration: 0.4,
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      easing: Easings.StrongEaseInOut,
    })

    tween.play()
  }, [vertical])

  return (
    <Shape
      {...properties}
      ref={shapeRef}
      scaleX={vertical ? 1 : undefined}
      scaleY={vertical ? undefined : 1}
      sceneFunc={vertical ? drawVerticalBox : drawBox}
    />
  )
}

Bounding.displayName = 'Components.Glyph.Bounding'
export default Bounding