import { Group, Rect, Text } from 'react-konva'

const Button = () => {
  return (
    <Group x={20} onClick={(e) => console.info(e)}>
      <Rect
        height={32}
        fill="red"
        width={32}
      />
      <Text
        text="add"
        fontFamily="Material Symbols Outlined"
        fontSize={32}
        x={50}
        y={50}
        fill="black"
      />
    </Group>
  )
}

Button.displayName = 'Glyph.Info.Button'
export default Button