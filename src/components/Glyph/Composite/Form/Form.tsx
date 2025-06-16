import type { HTMLAttributes } from 'react'
import { UseFontContext } from '../../../../contexts/Font/Font'

import styles from './styles.module.scss'
import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import Frames from './Composite/Frames'
import Frame from './Composite/Frame'

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

      <div>

        <div>
          <label>Color</label>
          <input type="color" id="fillColor" />
        </div>

        <div>
          <label>Size</label>
          <input type="number" id="fontSize" min="1" />
        </div>
      </div>

      <div>
        frames
         <Frames glyph={currentGlyphData} />
      </div>

      <div>
        <h2>Axes</h2>
        <p>These axes define how the font can change its appearance.</p>
      </div>

      <div>
        <h2>Stroke</h2>

        <div>
          <div>
            <div>
              <label>Color</label>
              <input type="color" id="strokeColor" />
            </div>

            <div>
              <label>Size</label>
              <div>
                <input
                  type="range" // Mudei de "number" para "range"
                  id="strokeWidth"
                  min="0"
                  max="30" // Defini o valor máximo como 30
                  step="1" // Permite passos de 1 em 1 (pixels)
                  // value={formState.strokeWidth} // Garante que o slider reflita o estado atual
                  // onChange={handleRangeChange} // Use sua função existente para inputs de range
                />
                <span>{30}</span> {/* Exibe o valor numérico ao lado do slider */}
              </div>
            </div>
          </div>

          <div>
            <label>Dash</label>
            <div>
              <input
                type="range"
                id="dashLength" // Este ID corresponde à nova propriedade no estado
                min="0"
                max="30"
                step="1"
                // value={formState.dashLength}
                // onChange={handleRangeChange} // Reutiliza handleRangeChange
              />
              <span>{0}</span>

              <input
                type="range"
                id="dashGap" // Este ID corresponde à nova propriedade no estado
                min="0"
                max="30"
                step="1"
                // value={formState.dashGap}
                // onChange={handleRangeChange} // Reutiliza handleRangeChange
              />
              <span>{0}</span>
            </div>
          </div>

          <div className={styles['form--line-cap']}>
            <label>Line Cap</label>
            <div>
              <label htmlFor="lineCap-butt">
              <input
                type="radio"
                id="lineCap-butt"
                name="lineCap" // Mesmo 'name' para todas as opções de lineCap
                value="butt"
                // checked={formState.strokeLinecap === 'butt'}
                // onChange={handleInputChange} // Reutiliza sua função existente
              />
              Butt (default)
            </label>

            <label htmlFor="lineCap-round">
              <input
                type="radio"
                id="lineCap-round"
                name="lineCap"
                value="round"
                // checked={formState.strokeLinecap === 'round'}
                // onChange={handleInputChange}
              />
              Round
            </label>

            <label htmlFor="lineCap-square">
              <input
                type="radio"
                id="lineCap-square"
                name="lineCap"
                value="square"
                // checked={formState.strokeLinecap === 'square'}
                // onChange={handleInputChange}
              />
              Square
            </label>
            </div>
          </div>

          <div className={styles['form--line-join']}>
            <label>Line Join</label>
            <div>
              <label htmlFor="lineJoin-miter">
                <input
                  type="radio"
                  id="lineJoin-miter"
                  name="lineJoin" // Use o mesmo 'name' para todos os radios do grupo
                  value="miter"
                  // checked={formState.strokeLinejoin === 'miter'} // Verifica se este é o valor selecionado
                />
                Miter (Default)
              </label>

              <label htmlFor="lineJoin-round">
                <input
                  type="radio"
                  id="lineJoin-round"
                  name="lineJoin"
                  value="round"
                  // checked={formState.strokeLinejoin === 'round'}
                />
                Round
              </label>

              <label htmlFor="lineJoin-bevel">
                <input
                  type="radio"
                  id="lineJoin-bevel"
                  name="lineJoin"
                  value="bevel"
                  // checked={formState.strokeLinejoin === 'bevel'}
                />
                Bevel
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        {currentGlyphData?.frames.map((frame, index) => (
          <div key={index}>
            1 frame, agregar glyph y tambien la lista
          </div>
        ))}
      </div>

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