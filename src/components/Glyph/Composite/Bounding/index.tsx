import { Arrow, Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import type { IBounding } from './interfaces'
import { UseGlyphContext } from '../../Context'

const Bounding = ({
  fill,
  vertical,
  ...props
}: IBounding) => {
  const {
    factor: {
      descender
    },
    path: {
      bounding: {
        x1, x2, y1, y2
      }
    }
  } = UseGlyphContext()

  const drawText = (ctx: Context, text: string, x: number, y: number, rotate = false) => {
    const { width } = ctx.measureText(text)

    ctx.font = '10px Roboto Mono'
    ctx.fillStyle = fill || '#fff'
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
          listening={false}
          fill={fill || '#fff'}
          pointerAtBeginning
          points={[x1 - 20, y1, x1 - 20, y2]}
        />
      ) : (
        <Arrow
          {...props}
          listening={false}
          fill={fill || '#fff'}
          pointerAtBeginning
          points={[x1, -(descender - 30), x2, -(descender - 30)]}
        />
      )}
      
      <Shape
        {...props}
        listening={false}
        sceneFunc={(ctx) => {
          const text = vertical ? `${Math.round(y1 - y2)}px` : `${Math.round(x2 - x1)}px`
          const x = vertical ? x1 - 30 : (x1 + x2)
          const y = vertical ? y1 + (y2 - y1) / 2 : -(descender - 50)

          drawText(ctx, text, x, y, vertical)
        }}
      />
    </>
  )
}

Bounding.displayName = 'Components.Glyph.Bounding'
export default Bounding