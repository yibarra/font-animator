import { useCallback } from 'react'

import Form from '../../../'
import { useGlyphsStore } from '../../../../../contexts/Glyphs/store'
import type { IPropertiesProps } from './interfaces'
import styles from '../../styles.module.scss'

const Properties = ({ glyph }: IPropertiesProps) => {
  const { updateGlyphProperties } = useGlyphsStore()

  const onHandler = useCallback((value: number) => (
    updateGlyphProperties(glyph.id, { fontSize: value })
  ), [glyph?.id, updateGlyphProperties])

  return (
    <div className={styles['form--glyph--axes--controls--item']}>
      <p>size</p>

      <div className={styles['form--glyph--axes--controls--item--range']}>
        <Form.RangeSlider
          defaultValue={glyph.properties.fontSize}
          min={120}
          max={1200}
          onHandler={onHandler}
        />
      </div>
    </div>
  )
}

Properties.displayName = 'Form.Glyph.Properties'
export default Properties