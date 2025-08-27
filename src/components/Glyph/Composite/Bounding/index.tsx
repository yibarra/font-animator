import { Arrow, Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import type { IBounding } from './interfaces'
import { UseGlyphContext } from '../../Context'

const Bounding = ({
  fill,
  vertical,
  ...props
}: IBounding) => {
  const { path: { bounding } } = UseGlyphContext()

  const { x1, x2, y1, y2 } = bounding

  const drawText = (ctx: Context, text: string, x: number, y: number, rotate = false) => {
    const { width } = ctx.measureText(text)

    ctx.font = '10px Roboto Mono'
    ctx.fillStyle = fill || '#ffffff'
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

  return (
    <>
      {vertical ? (
        <Arrow
          {...props}
          fill={fill || '#fff'}
          pointerAtBeginning
          points={[bounding.x1, bounding.y1, bounding.x1, bounding.y2]}
        />
      ) : (
        <Arrow
          {...props}
          fill={fill || '#fff'}
          pointerAtBeginning
          points={[bounding.x1, bounding.y1, bounding.x2, bounding.y1]}
        />
      )}
      
      <Shape
        {...props}
        sceneFunc={(ctx) => {
          const text = vertical ? `${Math.round(y1 - y2)}px` : `${Math.round(x2 - x1)}px`
          const x = vertical ? x1 - 10 : (x1 + x2)
          const y = vertical ? y2 / 2 : y1 + 20

          drawText(ctx, text, x, y, vertical)
        }}
      />
    </>
  )
}

Bounding.displayName = 'Components.Glyph.Bounding'
export default Bounding