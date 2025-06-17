import type { HTMLAttributes } from 'react'
import { UseFontContext } from '../../../../contexts/Font/Font'

import styles from './styles.module.scss'
import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../contexts/Glyphs/Glyphs'
import Frames from './Composite/Frames'
import Frame from './Composite/Frame'
import { default as FormComp } from '../../../Form'

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

      <div className={styles['form--group']} data-group="1">
        <div className={styles['form--group--color']}>
          <label className={styles['form--group--label']}>Color</label>
          <input type="color" id="fill" />
        </div>

        <div className={styles['form--group--size']}>
          <label className={styles['form--group--label']}>Size</label>
          <div className={styles['form--group--size']}>
            <input
              type="range"
              id="fontSize"
              min="0"
              max="30" // Defini o valor máximo como 30
              step="1" // Permite passos de 1 em 1 (pixels)
              // value={formState.strokeWidth} // Garante que o slider reflita o estado atual
              // onChange={handleRangeChange} // Use sua função existente para inputs de range
            />
          </div>
        </div>
      </div>

      <div>
        frames
         <Frames glyph={currentGlyphData} />
      </div>

      <div>
        <h2>Axes</h2>
        <p>These axes define how the font can change its appearance.</p>

        <div className={styles['form--group']}>
          {axes && Object.keys(axes ?? {}).map((axe, i) => (
            <div key={i}>
              <label className={styles['form--group--label']}>{axes && axes[axe]?.name}</label>
              <FormComp.RangeSlider {...axes[axe]} onChange={(e) => console.info(e)} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Stroke</h2>

        <div>
          <div className={styles['form--group']} data-group="1">
            <div className={styles['form--group--color']}>
              <label className={styles['form--group--label']}>Color</label>
              <input type="color" id="strokeColor" />
            </div>

            <div className={styles['form--group--size']}>
              <label className={styles['form--group--label']}>Size</label>
              <div className={styles['form--group--size']}>
                <input
                  type="range"
                  id="strokeWidth"
                  min="0"
                  max="30" // Defini o valor máximo como 30
                  step="1" // Permite passos de 1 em 1 (pixels)
                  // value={formState.strokeWidth} // Garante que o slider reflita o estado atual
                  // onChange={handleRangeChange} // Use sua função existente para inputs de range
                />
              </div>
            </div>
          </div>

          <div className={styles['form--group']} data-group="2">
            <label className={styles['form--group--label']}>Dash</label>
            <div className={styles['form--group--dash']}>
              <input
                type="range"
                id="dashLength"
                min="0"
                max="30"
                step="1"
                // value={formState.dashLength}
                // onChange={handleRangeChange} // Reutiliza handleRangeChange
              />

              <input
                type="range"
                id="dashGap"
                min="0"
                max="30"
                step="1"
                // value={formState.dashGap}
                // onChange={handleRangeChange} // Reutiliza handleRangeChange
              />
            </div>
          </div>

          <div className={styles['form--group']}>
            <label className={styles['form--group--label']}>Line Cap</label>

            <div className={styles['form--line--group']}>
              <label htmlFor="lineCap-butt">
              <input
                type="radio"
                id="lineCap-butt"
                name="lineCap"
                value="butt"
                checked
                // checked={formState.strokeLinecap === 'butt'}
                // onChange={handleInputChange} // Reutiliza sua função existente
              />
              <label>Butt</label>
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
              <label>Round</label>
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
              <label>Square</label>
            </label>
            </div>
          </div>

          <div className={styles['form--group']}>
            <label className={styles['form--group--label']}>Line Join</label>

            <div className={styles['form--line--group']}>
              <label htmlFor="lineJoin-miter">
                <input
                  type="radio"
                  id="lineJoin-miter"
                  name="lineJoin"
                  value="miter"
                  // checked={formState.strokeLinejoin === 'miter'} // Verifica se este é o valor selecionado
                />
                <label>Miter</label>
              </label>

              <label htmlFor="lineJoin-round">
                <input
                  type="radio"
                  id="lineJoin-round"
                  name="lineJoin"
                  value="round"
                  // checked={formState.strokeLinejoin === 'round'}
                />
                <label>Round</label>
              </label>

              <label htmlFor="lineJoin-bevel">
                <input
                  type="radio"
                  id="lineJoin-bevel"
                  name="lineJoin"
                  value="bevel"
                  // checked={formState.strokeLinejoin === 'bevel'}
                />
                <label>Bevel</label>
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