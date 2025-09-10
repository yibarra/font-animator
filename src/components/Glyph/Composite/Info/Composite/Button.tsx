import { Group, Rect, Text } from 'react-konva'

import type { IButtonProps } from '../interfaces'

const Button = ({ icon, height = 0, width = 0, ...props }: IButtonProps) => (
  <Group {...props}>
    <Rect
      height={height}
      fill="red"
      width={width}
    />
    <Text
      align="center"
      fill="#fff"
      fontFamily="Material Symbols Outlined"
      fontSize={width / 2}
      text={icon}
      x={16 / 2}
      y={16 / 2}
      verticalAlign="middle"
    />
  </Group>
)

Button.displayName = 'Glyph.Info.Button'
export default Button