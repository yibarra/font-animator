import { useFontStore } from '../../../../../../contexts/Font/store'
import { UseFontSettingsContext } from '../../../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../../../contexts/Glyphs/Glyphs'
import { getFontVariation } from '../../../../../../contexts/Glyphs/utils'
import Form from '../../../../../Form'
import styles from '../../styles.module.scss'
import type { IAxes } from './interfaces'

const Axes = ({ glyph, frame }: IAxes) => {
  const { font } = useFontStore()
  const { axes } = UseFontSettingsContext()
  const { setGlyphFrameAxes, setGlyphInstance } = UseGlyphsContext()

  console.info(frame)

  // on handle instance
  const onHandleInstance = (vars: number[]) => {
    if (!axes) {
      return
    }

    setGlyphInstance(glyph?.id ?? '', 0, vars)
  }

  if (!frame) {
    return
  }

  return (
    <>
      <div className={styles['form--axes']}>
        <div className={styles['form--group--title']}>
          <h2>Axes</h2>
          <p>These axes define how the font can change its appearance.</p>
        </div>

        <div className={styles['form--group']} data-group="2">
          {axes && Object.keys(axes ?? {}).map((axe, i) => (
            <div
              className={styles['form--axes--item']}
              key={i}
            >
              <p className={styles['form--group--label']}>{axes && axes[axe]?.name}</p>
              <Form.RangeSlider
                {...axes[axe]}
                defaultValue={Number(frame.axes[axe])}
                onHandler={(value) => {
                  const newAxes = {...frame.axes}
                  newAxes[axe] = Number(value)

                  console.info(frame.axes, newAxes, glyph?.axes)

                  setGlyphFrameAxes(glyph?.id ?? '', 0, newAxes)
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles['form--axes']}>
        <div className={styles['form--group--title']}>
          <p>Instances</p>
        </div>

        <div className={styles['form--group']} style={{ fontFamily: font?.familyName }}>
          {axes && font?.fvar?.instance.map((vars, index) => (
            <button
              className={styles['form--axes--instance']}
              key={index}
              onClick={() => onHandleInstance(vars.coord)}
              style={{ fontVariationSettings: getFontVariation(axes, vars.coord)}}
            >
              {font?.stringsForGlyph(glyph?.charIndex ?? 0)}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

Axes.displayName = 'Components.Glyph.Form.Axes'
export default Axes