import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

import Axes from './Composite/Axes/Axes'
import Frame from './Composite/Frame'
import Frames from './Composite/Frames'
import Stroke from './Composite/Stroke/Stroke'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import type { IForm } from './interfaces'
import styles from './styles.module.scss'

const Form = ({ ...props }: IForm) => {
  const [searchParams] = useSearchParams()
  const { glyphs } = UseGlyphsContext()

  const glyph = useMemo(() => glyphs.find((i) => i.id === searchParams.get('glyph')), [glyphs, searchParams])
  const frame = useMemo(() => glyph?.frames?.[Number(searchParams.get('frame') ?? 0)] ?? null, [glyph, searchParams])

  if (!glyph) {
    return
  }
  
  return (
    <div {...props} className={styles['form']}>
      <Frame frame={frame} glyph={glyph} />
      <Frames frame={frame} glyph={glyph} />
      <Axes frame={frame} glyph={glyph} />
      {/*

      <Stroke frame={frame} glyph={glyph} />*/}
    </div>
  )
}

Form.displayName = 'Component.Glyph.Form'
export default Form