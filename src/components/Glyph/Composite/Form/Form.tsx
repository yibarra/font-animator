import { UseFontContext } from '../../../../contexts/Font/Font'

import styles from './styles.module.scss'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import Frame from './Composite/Frame'
import { default as FormComp } from '../../../Form'
import Axes from './Composite/Axes/Axes'
import Stroke from './Composite/Stroke/Stroke'
import type { IForm } from './interfaces'

const Form = ({ glyph, ...props }: IForm) => {
  const { handleFileChange } = UseFontContext()
  const { setGlyphFrameProperties } = UseGlyphsContext()

  const currentFrame = 0

  if (!glyph) {
    return
  }
  
  return (
    <div {...props} className={styles['form']}>
      <div>
        <label>NOVA FONT</label>
        <label htmlFor="file-upload">Escolha um arquivo:</label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
        />
      </div>

      <Frame glyph={glyph} />

      <div className={styles['form--group']} data-group="1">
        <div className={styles['form--group--color']}>
          <p className={styles['form--group--label']}>Color</p>
          <input
            type="color"
            defaultValue={String(glyph?.frames[currentFrame].properties.fill ?? '#000')}
            id="fill"
            onChange={(e) => setGlyphFrameProperties(currentFrame, { fill: e.target.value })}
          />
        </div>

        <div className={styles['form--group--size']}>
          <p className={styles['form--group--label']}>Size</p>
          <div className={styles['form--group--size']}>
            <FormComp.RangeSlider
              min={10}
              max={240}
              step={1}
              defaultValue={12}
              onHandler={(value) => setGlyphFrameProperties(currentFrame, { fontSize: Number(value) })}
            />
          </div>
        </div>
      </div>

      <Axes currentFrame={currentFrame} glyph={glyph} />
      <Stroke currentFrame={currentFrame} glyph={glyph} />
    </div>
  )
}

Form.displayName = 'Component.Glyph.Form'
export default Form