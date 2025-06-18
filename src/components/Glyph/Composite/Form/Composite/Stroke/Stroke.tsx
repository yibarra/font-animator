import { UseGlyphsContext } from '../../../../../../contexts/Glyphs/Glyphs'
import type { IGlyph } from '../../../../../../contexts/Glyphs/interfaces'
import Form from '../../../../../Form'
import styles from '../../styles.module.scss'

const Stroke = ({ glyph, currentFrame = 0 }: { glyph: IGlyph; currentFrame: number }) => {
  const { setGlyphFrameProperties } = UseGlyphsContext()

  return (
    <div className={styles['form--stroke']}>
      <div className={styles['form--group--title']}>
        <h2>Stroke</h2>
      </div>
      
      <div>
        <div className={styles['form--group']} data-group="1">
          <div className={styles['form--group--color']}>
            <p className={styles['form--group--label']}>Color</p>
            <input
              type="color"
              defaultValue={String(glyph?.frames[currentFrame].properties.stroke ?? '#000')}
              onChange={(e) => setGlyphFrameProperties(currentFrame, { stroke: e.target.value })}
            />
          </div>

          <div className={styles['form--group--size']}>
            <p className={styles['form--group--label']}>Size</p>
            <div className={styles['form--group--size']}>
              <Form.RangeSlider
                min={10}
                max={30}
                step={1}
                defaultValue={12}
                onHandler={(value) => setGlyphFrameProperties(currentFrame, { strokeWidth: value })}
              />
            </div>
          </div>
        </div>

        <div className={styles['form--group']} data-group="2">
          <p className={styles['form--group--label']}>Dash</p>
          <div className={styles['form--group--dash']}>
            <Form.RangeSlider
              id="dashLength"
              min={10}
              max={30}
              step={1}
              defaultValue={12}
              onHandler={(value) => setGlyphFrameProperties(currentFrame, { dash: [value ,value] })}
            />

            <Form.RangeSlider
              id="dashGap"
              min={10}
              max={30}
              step={1}
              defaultValue={12}
              onHandler={(value) => setGlyphFrameProperties(currentFrame, { dash: [value ,value] })}
            />
          </div>
        </div>

        <div className={styles['form--group']}>
          <p className={styles['form--group--label']}>Line Cap</p>

          <div className={styles['form--line--group']}>
            <label>
              <input
                checked={glyph.frames[currentFrame].properties.lineCap === 'butt'}
                id="line-cap--butt"
                type="radio"
                name="lineCap"
                value="butt"
                onChange={() => setGlyphFrameProperties(currentFrame, { lineCap: 'butt' })}
              />
              <label htmlFor="line-cap--butt">Butt</label>
            </label>

            <label>
              <input
                checked={glyph.frames[currentFrame].properties.lineCap === 'round'}
                id="line-cap--round"
                type="radio"
                name="lineCap"
                value="round"
                onChange={() => setGlyphFrameProperties(currentFrame, { lineCap: 'round' })}
              />
              <label htmlFor="line-cap--round">Round</label>
            </label>

          <label>
            <input
              checked={glyph.frames[currentFrame].properties.lineCap === 'square'}
              id="line-cap--square"
              type="radio"
              name="lineCap"
              value="square"
              onChange={() => setGlyphFrameProperties(currentFrame, { lineCap: 'square' })}
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
                checked={glyph.frames[currentFrame].properties.lineJoin === 'miter'}
                id="line-join--miter"
                type="radio"
                name="lineJoin"
                value="miter"
                onChange={() => setGlyphFrameProperties(currentFrame, { lineJoin: 'miter' })}
              />
              <label htmlFor="line-join--miter">Miter</label>
            </label>

            <label >
              <input
                checked={glyph.frames[currentFrame].properties.lineJoin === 'round'}
                id="line-join--round"
                type="radio"
                name="lineJoin"
                value="round"
                onChange={() => setGlyphFrameProperties(currentFrame, { lineJoin: 'round' })}
              />
              <label htmlFor="line-join--round">Round</label>
            </label>

            <label>
              <input
                checked={glyph.frames[currentFrame].properties.lineJoin === 'bevel'}
                id="line-join--bevel"
                type="radio"
                name="lineJoin"
                value="bevel"
                onChange={() => setGlyphFrameProperties(currentFrame, { lineJoin: 'bevel' })}
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