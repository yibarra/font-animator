import type { HTMLAttributes } from 'react'
import { UseFontContext } from '../../../../contexts/Font/Font'

import styles from './styles.module.scss'
import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'

const Form = (props: HTMLAttributes<HTMLDivElement>) => {
  const { axes } = UseFontSettingsContext()
  const { font, handleFileChange } = UseFontContext()
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
  
  return (
    <div className={styles['form']}>
      <label>NOVA FONT</label>
      <label htmlFor="file-upload">Escolha um arquivo:</label>
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
      />

      <div>
        <label>Cor de Preenchimento:</label>
        <input type="color" id="fillColor" />

        <label>Tamanho da Fonte (px):</label>
        <input type="number" id="fontSize" min="1" />

        <label>Posição X:</label>
        <input type="number" id="posX" />

        <label>Posição Y:</label>
        <input type="number" id="posY" />

        <label>Rotação (graus):</label>
        <input type="number" id="rotation" />
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
            <label>Padrão de Traços (Ex: '5 5' para pontilhado):</label>
            <input type="text" id="dash"  />

          <label>Cor do Traço:</label>
          <input type="color" id="strokeColor" />

          <label>Espessura do Traço (px):</label>
          <input type="number" id="stroke" min="0" />

          <label>Extremidades do Traço:</label>
          <select
            id="lineCap"
          >
              <option value="butt">Quadrado (Padrão)</option>
              <option value="round">Redondo</option>
              <option value="square">Quadrado (Estendido)</option>
          </select>

          <label htmlFor="strokeLinejoin">Cantos do Traço:</label> {/* Novo! */}
          <select
              id="lineJoin"
          >
              <option value="miter">Pontiagudo (Padrão)</option>
              <option value="round">Redondo</option>
              <option value="bevel">Chanfrado</option>
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