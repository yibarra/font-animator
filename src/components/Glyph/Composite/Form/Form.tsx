import type { HTMLAttributes } from 'react'
import { UseLoadFontContext } from '../../../../contexts/LoadFont/LoadFont'

import styles from './styles.module.scss'
import { UseFontSettingsContext } from '../../../../contexts/FontSettings/FontSettings'

const Form = (props: HTMLAttributes<HTMLDivElement>) => {
  const { font } = UseLoadFontContext()
  const { axes } = UseFontSettingsContext()

  const getFontVariation = (coord: number[]) => {
    if (axes) {
      const axesNames = Object.keys(axes)

      return `"${axesNames[0]}" ${coord[0]}, "${axesNames[1]}" ${coord[1]}`
    }

    return ''
  }

  return (
    <div className={styles['form']} style={{ ...props, fontFamily: font?.familyName }}>
      <div>
        <p>Instances</p>

        {font && (
          <div>
            {font?.fvar?.instance.map((ins, index) => (
              <button
                className={styles['form--btn-instance']}
                key={index}
                onClick={() => console.info(ins.coord)}
                style={{
                  fontVariationSettings: getFontVariation(ins.coord)
                }}
              >F</button>
            ))}
          </div>
        )}
      </div>

      <div>
        buttons
      </div>
    </div>
  )
}

Form.displayName = 'Component.Glyph.Form'
export default Form