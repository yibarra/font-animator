import { useCallback } from 'react'

import Form from '../../..'
import styles from '../../styles.module.scss'
import { useGlyphsStore } from '../../../../../contexts/Glyphs/store'
import type { IPropertiesProps } from './interfaces'

const Properties = ({ glyph }: IPropertiesProps) => {
  const { updateGlyphProperties } = useGlyphsStore()

  const onHandler = useCallback((value: number) => {
    updateGlyphProperties(glyph.id, { fontSize: value })
  }, [glyph?.id, updateGlyphProperties])

  return (
    <div className={styles['form--glyph--axes--controls--item']}>
      <p>size</p>

      <div className={styles['form--glyph--axes--controls--item--range']}>
        <Form.RangeSlider
          defaultValue={glyph.properties.fontSize}
          min={70}
          max={6000}
          onHandler={onHandler}
        />
      </div>
    </div>
  )
}

export default Properties