import { useCallback } from 'react'

import { useFontStore } from '../../../../../contexts/Font/store'
import { UseFontSettingsContext } from '../../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../../contexts/Glyphs/Glyphs'
import { getFontVariation } from '../../../../../contexts/Glyphs/utils'
import styles from '../../styles.module.scss'
import type { IAxes } from './interfaces'

const Instances = ({ currentFrame, glyph, frame }: IAxes) => {
  const { font } = useFontStore()
  const { axes } = UseFontSettingsContext()
  const { setGlyphInstance } = UseGlyphsContext()

    // on handle instance
  const onHandleInstance = useCallback((vars: number[]) => {
    if (!axes) {
      return
    }

    setGlyphInstance(glyph?.id ?? '', currentFrame ?? 0, vars)
  }, [axes, currentFrame, glyph?.id ,setGlyphInstance])

  return (
    <div className={styles['form--glyph--axes']}>
      <p className={styles['form--group--label']}>Instances</p>

      <div className={styles['form--glyph--axes--list']} style={{ fontFamily: font?.familyName }}>
        {axes && font?.fvar?.instance.map((vars, index) => (
          <button
            className={styles['form--glyph--axes--instance']}
            data-active={
              Object.values(frame?.axes ?? {}).length === vars.coord.length &&
              Object.values(frame?.axes ?? {}).every((v, i) => v === vars.coord[i])
            }
            key={index}
            onClick={() => onHandleInstance(vars.coord)}
            style={{ fontVariationSettings: getFontVariation(axes, vars.coord) }}
          >
            {font?.stringsForGlyph(glyph?.charIndex ?? 0)}
          </button>
        ))}
      </div>
    </div>
  )
}

Instances.displayName = 'Components.Glyph.Form.Axes'
export default Instances