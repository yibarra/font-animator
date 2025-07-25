import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

import Axes from './Composite/Axes/Axes'
import Frames from './Composite/Frames'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import type { IForm } from './interfaces'
import styles from './styles.module.scss'
import { useGridContext } from '../../../../contexts/Grid'
import Properties from './Composite/Properties'

const Form = ({ ...props }: IForm) => {
  const [searchParams] = useSearchParams()
  const { offsetX, offsetY } = useGridContext()
  const { current, glyphs } = UseGlyphsContext()

  const glyph = useMemo(() => glyphs.find((_, i) => i === current), [current, glyphs])
  const frame = useMemo(() => glyph?.frames?.[Number(searchParams.get('frame') ?? 0)] ?? null, [glyph, searchParams])

  if (!glyph) {
    return
  }
  
  return (
    <div
      {...props}
      className={styles['form']}
      style={{
        left: glyph.position[0] + offsetX,
        top: glyph.position[1] + offsetY,
        transform: `rotate(${glyph.rotation}deg)`
      }}
    >
      <Properties frame={frame} glyph={glyph} />
      <Axes frame={frame} glyph={glyph} />
      {/* <Frames frame={frame} glyph={glyph} /> */}
      {/*  */}
      {/* <Stroke currentFrame={0} glyph={glyph} /> */}
    </div>
  )
}

Form.displayName = 'Component.Glyph.Form'
export default Form