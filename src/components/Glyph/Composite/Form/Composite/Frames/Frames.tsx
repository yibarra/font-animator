import { UseFontContext } from '../../../../../../contexts/Font/Font'
import { getFontVariationSettings } from '../../../../../../contexts/Font/utils'
import type { IFrames } from './interfaces'
import styles from './styles.module.scss'
import stylesForm from '../../styles.module.scss'
import Rotation from '../Rotation'
import { useSearchParams } from 'react-router-dom'

const Frames = ({ currentFrame, glyph }: IFrames) => {
  const { font } = UseFontContext()
  const [, setSearchParams] = useSearchParams()

  const onHandler = (current: number) => {
    const newParams = new URLSearchParams(window.location.search)
    newParams.set('currentFrame', String(current))

    setSearchParams(newParams, { replace: true })
  }

  return (
    <div className={styles['frames']}>
      <div className={stylesForm['form--group--title']}>
        <h2>Transition</h2>
      </div>
      
      <div className={styles['frames--wrapper']}>
        {Array.isArray(glyph?.frames) && glyph.frames.map((frame, index) => (
          <div className={styles['frames--frame']} key={index}>
            <div className={styles['frames--glyph']}>
              <div className={styles['frames--frame--options']}>
                <Rotation size={10} rotation={glyph?.properties.rotation} />
              </div>

              <button
                className={styles['frames--glyph--text']}
                data-active={currentFrame === index}
                onClick={() => onHandler(index)}
                style={{
                  fontFamily: font?.familyName,
                  fontVariationSettings: getFontVariationSettings(frame.axes)
                }}
              >
                {font?.getGlyph(glyph?.charIndex ?? 0).name}
              </button>

              <div className={styles['frames--glyph--pos']}>
                <p>x: <span>{frame.position[0]}</span></p>
                <p>y: <span>{frame.position[1]}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Frames.displayName = 'Glyph.Form.Frames'
export default Frames
