import { UseFontContext } from '../../../../../../contexts/Font/Font'
import { getFontVariationSettings } from '../../../../../../contexts/Font/utils'
import type { IFrames } from './interfaces'
import styles from './styles.module.scss'

const Frames = ({ glyph }: IFrames) => {
  const { font } = UseFontContext()

  return (
    <div className={styles['frames']}>
      <p>Frames</p>
      
      <div className={styles['frames--wrapper']}>
        {Array.isArray(glyph?.frames) && glyph.frames.map((frame, i) => (
          <div className={styles['frames--frame']} key={i}>
            <div className={styles['frames--glyph']}></div>

            <button
              className={styles['frames--glyph']}
              style={{
                fontFamily: font?.familyName,
                fontVariationSettings: getFontVariationSettings(frame.axes)
              }}
            >
              {font?.getGlyph(glyph?.charIndex ?? 0).name}
            </button>

            <div className={styles['frames--glyph--pos']}>
              PosX: {frame.position[0]}
              PosY: {frame.position[1]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Frames.displayName = 'Glyph.Form.Frames'
export default Frames
