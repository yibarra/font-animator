import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

import Axes from './Composite/Axes/Axes'
import Frames from './Composite/Frames'
import Properties from './Composite/Properties'
import { UseFontContext } from '../../../contexts/Font/Font'
import { UseGlyphsContext } from '../../../contexts/Glyphs/Glyphs'
import type { IForm } from './interfaces'
import styles from './styles.module.scss'

const Glyph = ({ ...props }: IForm) => {
  const { font } = UseFontContext()
  const [searchParams] = useSearchParams()
  const { current, glyphs } = UseGlyphsContext()

  const currentFrame = Number(searchParams.get('frame') ?? 0)
  
  const glyph = useMemo(() => glyphs.find((_, i) => i === current), [current, glyphs])
  const frame = useMemo(() => glyph?.frames?.[currentFrame] ?? null, [glyph, currentFrame])

  const [char] = font?.stringsForGlyph(glyph?.charIndex ?? 0) ?? []
  
  if (!glyph) {
    return
  }
  
  return (
    <div {...props} className={styles['form--glyph']}>
      <Properties frame={frame} glyph={glyph} />
      <Axes
        char={char}
        currentFrame={currentFrame}
        frame={frame}
        id={glyph.id}
      />
      <Frames
        charIndex={glyph['charIndex']}
        currentFrame={currentFrame}
        frames={glyph['frames']}
      />
      {/* <Stroke currentFrame={0} glyph={glyph} /> */}
    </div>
  )
}

Glyph.displayName = 'Component.Glyph.Form'
export default Glyph