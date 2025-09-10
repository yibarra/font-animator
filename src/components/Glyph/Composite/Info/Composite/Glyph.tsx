import { Group } from 'react-konva'

import { UseGlyphContext } from '../../../Context'
import { useGlyphsStore } from '../../../../../contexts/Glyphs/store'
import { default as Base } from '../'
import type { IInfoProps } from '../interfaces'

const Glyph = (props: IInfoProps) => {
  
  const { remove } = useGlyphsStore()
  const {
    data,
    state,
    updateState
  } = UseGlyphContext()

  const { id } = data
  const { metrics, skeleton, viewCommands, viewPoints } = state

  const size = 32
  const gap = size + 1

  return (
    <Group {...props}>
      {[
        { icon: 'skeleton', x: 0, y: 0, onClick: () => updateState('skeleton', !skeleton) },
        { icon: 'diagonal_line', x: gap, y: 0, onClick: () => updateState('viewPoints', !viewPoints) },
        { icon: 'code_blocks', x: 0, y: gap, onClick: () => updateState('viewCommands', !viewCommands) },
        { icon: 'straighten', x: gap, y: gap, onClick: () => updateState('metrics', !metrics) },
        { icon: 'delete', x: 0, y: gap * 2, onClick: () => remove(id) },
      ].map((button, key) => (
        <Base.Button {...button} height={size} key={key} width={size} />
      ))}
    </Group>
  )
}

Glyph.displayName = 'Components.Glyph.Info.Glyph'
export default Glyph