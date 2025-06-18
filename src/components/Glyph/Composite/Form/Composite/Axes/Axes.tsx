import { UseFontSettingsContext } from '../../../../../../contexts/FontSettings/FontSettings'
import { UseGlyphsContext } from '../../../../../../contexts/Glyphs/Glyphs'
import Form from '../../../../../Form'
import styles from '../../styles.module.scss'

const Axes = ({ currentFrame = 0 }: { currentFrame: number }) => {
  const { axes } = UseFontSettingsContext()
  const { setGlyphFrameAxes } = UseGlyphsContext()

  return (
    <div className={styles['form--axes']}>
      <div className={styles['form--group--title']}>
        <h2>Axes</h2>
        <p>These axes define how the font can change its appearance.</p>
      </div>

      <div className={styles['form--group']}>
        {axes && Object.keys(axes ?? {}).map((axe, i) => (
          <div className={styles['form--axes--item']} key={i}>
            <p className={styles['form--group--label']}>{axes && axes[axe]?.name}</p>
            <Form.RangeSlider
              {...axes[axe]}
              onHandler={(value) => setGlyphFrameAxes(currentFrame, axe, Number(value))}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

Axes.displayName = 'Components.Glyph.Form.Axes'
export default Axes