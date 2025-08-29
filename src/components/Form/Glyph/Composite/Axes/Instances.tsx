import { useCallback } from 'react'

import { UseGlyphsContext } from '../../../../../contexts/Glyphs'
import { getFontVariation } from '../../../../../contexts/Glyphs/utils'
import { useFontStore } from '../../../../../contexts/Font/store'
import styles from '../../styles.module.scss'
import type { IAxes } from './interfaces'

const Instances = ({ currentFrame, char, id, frame }: IAxes) => {
  const { font } = useFontStore()
  const { setGlyphInstance } = UseGlyphsContext()

    // on handle instance
  const onHandleInstance = useCallback((vars: number[]) => {
    if (!font?.variationAxes) {
      return
    }

    setGlyphInstance(id ?? '', currentFrame ?? 0, vars)
  }, [font, currentFrame, id ,setGlyphInstance])

  return (
    <div className={styles['form--glyph--axes']}>
      <p>Instances</p>

      <div
        className={styles['form--glyph--axes--list']}
        style={{ fontFamily: font?.familyName }}
      >
        {font?.variationAxes && font?.fvar?.instance.map((vars, index) => (
          <button
            className={styles['form--glyph--axes--instance']}
            data-active={
              Object.values(frame?.axes ?? {}).length === vars.coord.length &&
              Object.values(frame?.axes ?? {}).every((v, i) => v === vars.coord[i])
            }
            key={index}
            onClick={() => onHandleInstance(vars.coord)}
            style={{ fontVariationSettings: getFontVariation(font?.variationAxes, vars.coord) }}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  )
}

Instances.displayName = 'Components.Glyph.Form.Axes'
export default Instances