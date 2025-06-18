import { useEffect, useState, type HTMLAttributes } from 'react'
import { UseFontContext } from '../../../../contexts/Font/Font'

import styles from './styles.module.scss'
import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import Frame from './Composite/Frame'
import { default as FormComp } from '../../../Form'
import Axes from './Composite/Axes/Axes'
import Stroke from './Composite/Stroke/Stroke'

const Form = ({ current, ...props }: HTMLAttributes<HTMLDivElement> & { current: string | null }) => {
  const [currentForm, setCurrentForm] = useState<string | null>(null)

  const { axes } = UseFontSettingsContext()
  const { font, handleFileChange } = UseFontContext()
  const { glyphs, setGlyphInstance, setGlyphFrameProperties } = UseGlyphsContext()

  // on handle instance
  const onHandleInstance = (vars: number[]) => {
    if (!axes) {
      return
    }

    setGlyphInstance(0, vars)
  }

  const getFontVariation = (coord: number[]) => {
    if (axes) {
      const axesNames = Object.keys(axes)

      return `"${axesNames[0]}" ${coord[0]}, "${axesNames[1]}" ${coord[1]}`
    }

    return ''
  }

  const currentGlyphData = glyphs.find((g) => g.id === current)
  const glyph = font?.stringsForGlyph(currentGlyphData?.charIndex ?? 70)
  const currentFrame = 0

  console.info(currentForm, 'current form')

  useEffect(() => {
    setCurrentForm(current)
  }, [setCurrentForm, current])

  if (current === null) {
    return
  }
  
  return (
    <div className={styles['form']}>
      <div>
        <label>NOVA FONT</label>
        <label htmlFor="file-upload">Escolha um arquivo:</label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
        />
      </div>

      <Frame glyph={currentGlyphData} />

      <div className={styles['form--group']} data-group="1">
        <div className={styles['form--group--color']}>
          <label className={styles['form--group--label']}>Color</label>
          <input
            type="color"
            defaultValue={String(currentGlyphData?.frames[currentFrame].properties.fill ?? '#000')}
            id="fill"
            onChange={(e) => setGlyphFrameProperties(currentFrame, { fill: e.target.value })}
          />
        </div>

        <div className={styles['form--group--size']}>
          <label className={styles['form--group--label']}>Size</label>
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

      <Axes current={current} currentFrame={currentFrame} />

      <Stroke currentFrame={currentFrame} glyph={currentGlyphData} />

      <div>
        <h2>Axes</h2>
        <p>Instances</p>
        {font && (
          <div style={{ ...props, fontFamily: font?.familyName }}>
            {font?.fvar?.instance.map((vars, index) => (
              <button
                className={styles['form--btn-instance']}
                key={index}
                onClick={() => onHandleInstance(vars.coord)}
                style={{
                  fontVariationSettings: getFontVariation(vars.coord)
                }}
              >
                {glyph}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

Form.displayName = 'Component.Glyph.Form'
export default Form