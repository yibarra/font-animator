import { UseGlyphsContext } from '../../../../../../contexts/Glyphs/Glyphs'
import type { IGlyph } from '../../../../../../contexts/Glyphs/interfaces'
import Form from '../../../../../Form'
import styles from '../../styles.module.scss'
import Color from '../Color'

const Stroke = ({ glyph }: { glyph: IGlyph; currentFrame: number }) => {
  const { setGlyphProperties } = UseGlyphsContext()

  return (
    <div className={styles['form--stroke']}>
      <div className={styles['form--group--title']}>
        <h2>Stroke</h2>
      </div>
      
      <div>
        <div className={styles['form--group']} data-group="1">
          <div className={styles['form--group--color']}>
            <p className={styles['form--group--label']}>Color</p>
            <Color color={glyph?.properties?.stroke ?? ''} property='stroke' />
          </div>

          <div className={styles['form--group--size']}>
            <p className={styles['form--group--label']}>Size</p>
            <div className={styles['form--group--size']}>
              <Form.RangeSlider
                min={0}
                max={30}
                step={1}
                defaultValue={glyph?.properties?.strokeWidth}
                onHandler={(value) => setGlyphProperties(glyph.id, { strokeWidth: value })}
              />
            </div>
          </div>
        </div>

        <div className={styles['form--group']} data-group="2">
          <p className={styles['form--group--label']}>Dash</p>
          <div className={styles['form--group--dash']}>
            <Form.RangeSlider
              id="dashLength"
              min={0}
              max={30}
              step={1}
              defaultValue={glyph?.properties?.dash ? glyph?.properties?.dash[0] : 0}
              onHandler={(value) => setGlyphProperties(glyph.id, { dash: [value, glyph?.properties?.dash ? glyph?.properties?.dash[1] : 0] })}
            />

            <Form.RangeSlider
              id="dashGap"
              min={0}
              max={30}
              step={1}
              defaultValue={glyph?.properties?.dash ? glyph?.properties?.dash[1] : 0}
              onHandler={(value) => setGlyphProperties(glyph.id, { dash: [glyph?.properties?.dash ? glyph?.properties?.dash[0] : 0, value] })}
            />
          </div>
        </div>

        <div className={styles['form--group']}>
          <p className={styles['form--group--label']}>Line Cap</p>

          <div className={styles['form--line--group']}>
            <label>
              <input
                checked={glyph?.properties.lineCap === 'butt'}
                id="line-cap--butt"
                type="radio"
                name="lineCap"
                value="butt"
                onChange={() => setGlyphProperties(glyph.id, { lineCap: 'butt' })}
              />
              <label htmlFor="line-cap--butt">Butt</label>
            </label>

            <label>
              <input
                checked={glyph?.properties.lineCap === 'round'}
                id="line-cap--round"
                type="radio"
                name="lineCap"
                value="round"
                onChange={() => setGlyphProperties(glyph.id, { lineCap: 'round' })}
              />
              <label htmlFor="line-cap--round">Round</label>
            </label>

          <label>
            <input
              checked={glyph?.properties.lineCap === 'square'}
              id="line-cap--square"
              type="radio"
              name="lineCap"
              value="square"
              onChange={() => setGlyphProperties(glyph.id, { lineCap: 'square' })}
            />
            <label htmlFor="line-cap--square">Square</label>
          </label>
          </div>
        </div>

        <div className={styles['form--group']}>
          <p className={styles['form--group--label']}>Line Join</p>

          <div className={styles['form--line--group']}>
            <label>
              <input
                checked={glyph?.properties.lineJoin === 'miter'}
                id="line-join--miter"
                type="radio"
                name="lineJoin"
                value="miter"
                onChange={() => setGlyphProperties(glyph.id, { lineJoin: 'miter' })}
              />
              <label htmlFor="line-join--miter">Miter</label>
            </label>

            <label >
              <input
                checked={glyph?.properties.lineJoin === 'round'}
                id="line-join--round"
                type="radio"
                name="lineJoin"
                value="round"
                onChange={() => setGlyphProperties(glyph.id, { lineJoin: 'round' })}
              />
              <label htmlFor="line-join--round">Round</label>
            </label>

            <label>
              <input
                checked={glyph?.properties.lineJoin === 'bevel'}
                id="line-join--bevel"
                type="radio"
                name="lineJoin"
                value="bevel"
                onChange={() => setGlyphProperties(glyph.id, { lineJoin: 'bevel' })}
              />
              <label htmlFor="line-join--bevel">Bevel</label>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

Stroke.displayName = 'Component.Glyph.Form.Stroke'
export default Stroke