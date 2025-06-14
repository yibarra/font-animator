import type { HTMLAttributes } from 'react'
import { UseLoadFontContext } from '../../../../contexts/LoadFont/LoadFont'

import styles from './styles.module.scss'
import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'

const Form = (props: HTMLAttributes<HTMLDivElement>) => {
  const { axes } = UseFontSettingsContext()
  const { font } = UseLoadFontContext()
  const { current, glyphs, setGlyphInstance } = UseGlyphsContext()

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
  
  console.info(glyph, currentGlyphData?.charIndex, glyphs, current)
  return (
    <div className={styles['form']}>
      <div>
        <label>Cor de Preenchimento:</label>
        <input type="color" id="fillColor" value="#333333" />

        <label>Tamanho da Fonte (px):</label>
        <input type="number" id="fontSize" value="40" min="1" />
      </div>
      <div>
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

      <div>
        <div>
          <h3>Traço</h3>
          <label>Cor do Traço:</label>
          <input type="color" id="strokeColor" value="#999999" />

          <label>Espessura do Traço (px):</label>
          <input type="number" id="strokeWidth" value="0" min="0" />

          <h3>Alinhamento</h3>
          <label>Alinhamento Horizontal:</label>
          <select id="textAnchor">
              <option value="start">Início</option>
              <option value="middle" selected>Meio</option>
              <option value="end">Fim</option>
          </select>

          <label>Alinhamento Vertical:</label>
          <select id="dominantBaseline">
              <option value="alphabetic">Alfabética</option>
              <option value="middle" selected>Meio (Central)</option>
              <option value="hanging">Superior</option>
              <option value="text-before-edge">Borda Superior do Texto</option>
              <option value="text-after-edge">Borda Inferior do Texto</option>
          </select>
        </div>
      </div>

      <div>
        {currentGlyphData?.frames.map((frame, index) => (
          <div key={index}>
            1 frame, agregar glyph y tambien la lista
          </div>
        ))}
      </div>
    </div>
  )
}

Form.displayName = 'Component.Glyph.Form'
export default Form