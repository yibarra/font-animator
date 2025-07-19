import { useCallback } from 'react'
import Form from '../../../../../Form'
import styles from '../../styles.module.scss'
import { useGlyphsStore } from '../../../../../../contexts/Glyphs/store'
import Color from '../Color'

const Properties = ({ frame, glyph }: any) => {
  const { updateGlyphProperties } = useGlyphsStore()

  const onHandler = useCallback((value: number) => {
    updateGlyphProperties(glyph.id, { fontSize: value })
  }, [glyph?.id, updateGlyphProperties])

  return (
    <div className={styles['form--group']} data-group="2">
      <div className={styles['form--axes--item']}>
        <p className={styles['form--group--label']}>size</p>

        <Form.RangeSlider
          defaultValue={12}
          min={12}
          max={350}
          onHandler={onHandler}
        />
      </div>

      {/*
      <div>
        <Color
          color={glyph?.properties?.fill ?? ''}
          id={glyph?.id}
          property='fill' />
      </div>
      */}
    </div>
  )
}

export default Properties