import { Group, Path } from 'react-konva'
import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'

const Toggle = ({ bounding, glyph, numericAxes, setSkeleton, skeleton, ...props }: any) => {
  const { getPathDataGlyph } = UseFontSettingsContext()

  const { path } = getPathDataGlyph(
    glyph.charIndex,
    numericAxes,
    36
  )

  return (
    <Group x={bounding.x2 / 2 + 24} y={-bounding.y2 / 2 + 50}>
      <Path
        {...props}
        data={path}
        onClick={() => setSkeleton((prev) => !prev)}
        fill={!skeleton ? "white" : "transparent"}
        stroke={!skeleton ? "transparent" : "white"}
        strokeWidth={1}
        fillStyle={!skeleton ? "white" : "transparent"}
        scale={{ x: 1, y: -1 }}
      />
    </Group>

  )
}

Toggle.displayName = 'Glyph.Skeleton.Toggle'
export default Toggle