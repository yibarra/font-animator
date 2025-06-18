import { UseFontContext } from '../../../../../../contexts/Font/Font'
import { getFontVariationSettings } from '../../../../../../contexts/Font/utils'
import type { IFrames } from './interfaces'
import styles from './styles.module.scss'

const Frames = ({ glyph }: IFrames) => {
  const { font } = UseFontContext()

  return (
    <div className={styles['frames']}>
      <p>Frames</p>
      
      {Array.isArray(glyph?.frames) && glyph.frames.map((frame, i) => (
        <div className={styles['frames--current']} key={i}>
          <div
            className={styles['frames--current--glyph']}
            style={{
              fontFamily: font?.familyName,
              fontVariationSettings: getFontVariationSettings(frame.axes)
            }}
          >
            {font?.getGlyph(glyph?.charIndex ?? 0).name}
          </div>

          <div className={styles['frames--current--pos']}>
            PosX: {frame.position[0]}
            PosY: {frame.position[1]}
          </div>
        </div>
      ))}
    </div>
  )
}

Frames.displayName = 'Glyph.Form.Frames'
export default Frames
