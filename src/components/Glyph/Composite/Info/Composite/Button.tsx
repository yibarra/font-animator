import { Group, Rect, Text, Shape } from 'react-konva'

import type { IButtonProps } from '../interfaces'

const Button = ({ active = false, icon, height = 0, width = 0, ...props }: IButtonProps) => {
  return (
    <Group {...props}>
      {icon === 'delete' && (
        <Rect
          height={height}
          fill="red"
          width={width}
        />
      )}

      {(!active && icon !== 'delete') && (
        <Group clipFunc={(ctx) => ctx.rect(0, 0, width, height)}>
          <Shape
            sceneFunc={(ctx) => {
              ctx.beginPath()

              const lineSpacing = 4

              for (let i = -height; i < width; i += lineSpacing) {
                ctx.moveTo(i, height)
                ctx.lineTo(i + height, 0)
              }

              ctx.lineWidth = 0.5
              ctx.strokeStyle = '#fff'
              ctx.stroke()
            }}
          />
        </Group>
      )}

      <Text
        align="center"
        fill="#fff"
        fontFamily="Material Symbols Outlined"
        fontSize={16}
        text={icon}
        x={(width - 16) / 2}
        y={(height - 16) / 2}
        verticalAlign="middle"
      />
    </Group>
  )
}

Button.displayName = 'Glyph.Info.Button'
export default Button