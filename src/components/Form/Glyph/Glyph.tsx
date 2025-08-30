import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

import Axes from './Composite/Axes/Axes'
import Properties from './Composite/Properties'
import { useMainStore } from '../../../contexts/Main/store'
import { useFontStore } from '../../../contexts/Font/store'
import { useGlyphsStore } from '../../../contexts/Glyphs/store'
import styles from './styles.module.scss'
import type { IForm } from './interfaces'

const Glyph = ({ ...props }: IForm) => {
  const { font } = useFontStore()
  const [searchParams] = useSearchParams()
  const { current, glyphs } = useGlyphsStore()
  const { isPlaying = false, isOpenSelector = false } = useMainStore()

  const currentFrame = Number(searchParams.get('frame') ?? 0)
  
  const glyph = useMemo(() => glyphs.find((_, i) => i === current), [current, glyphs])
  const frame = useMemo(() => glyph?.frames?.[currentFrame] ?? null, [glyph, currentFrame])

  const [char] = font?.stringsForGlyph(glyph?.charIndex ?? 0) ?? []
  
  if (!glyph || isPlaying || isOpenSelector) {
    return <></>
  }
  
  return (
    <div {...props} className={styles['form--glyph']}>
      <span className="material-symbols-outlined">
        custom_typography
      </span>

      <Properties glyph={glyph} />

      <Axes
        char={char}
        currentFrame={currentFrame}
        frame={frame}
        id={glyph.id}
      />
      {/* <Stroke currentFrame={0} glyph={glyph} /> */}
    </div>
  )
}

Glyph.displayName = 'Component.Glyph.Form'
export default Glyph