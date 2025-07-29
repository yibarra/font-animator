import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

import Axes from './Composite/Axes/Axes'
import Frames from './Composite/Frames'
import { UseGlyphsContext } from '../../../contexts/Glyphs/Glyphs'
import type { IForm } from './interfaces'
import styles from './styles.module.scss'
import Properties from './Composite/Properties'

const Glyph = ({ ...props }: IForm) => {
  const [searchParams] = useSearchParams()
  const { current, glyphs } = UseGlyphsContext()

  const glyph = useMemo(() => glyphs.find((_, i) => i === current), [current, glyphs])
  const currentFrame = Number(searchParams.get('frame'))
  const frame = useMemo(() => glyph?.frames?.[Number(searchParams.get('frame') ?? 0)] ?? null, [glyph, searchParams])

  if (!glyph) {
    return
  }
  
  return (
    <div {...props} className={styles['form--glyph']}>
      <Properties frame={frame} glyph={glyph} />
      <Axes
        currentFrame={currentFrame}
        frame={frame}
        glyph={glyph}
      />
      <Frames frame={frame} glyph={glyph} />
      {/* <Stroke currentFrame={0} glyph={glyph} /> */}
    </div>
  )
}

Glyph.displayName = 'Component.Glyph.Form'
export default Glyph