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

  const size = 31
  const gap = size + 1

  return (
    <Group {...props}>
      {[
        { active: skeleton, icon: 'skeleton', x: 0, y: 0, onClick: () => updateState('skeleton', !skeleton) },
        { active: viewPoints, icon: 'diagonal_line', x: gap, y: 0, onClick: () => updateState('viewPoints', !viewPoints) },
        { active: viewCommands, icon: 'code_blocks', x: gap * 2, y: 0, onClick: () => updateState('viewCommands', !viewCommands) },
        { active: metrics, icon: 'straighten', x: gap, y: gap, onClick: () => updateState('metrics', !metrics) },
        { icon: 'delete', x: gap * 3, y: 0, onClick: () => remove(id) },
      ].map((button, key) => (
        <Base.Button {...button} height={size} key={key} width={size} />
      ))}
    </Group>
  )
}

Glyph.displayName = 'Components.Glyph.Info.Glyph'
export default Glyph