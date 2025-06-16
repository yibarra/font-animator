import { useFontStore } from '../../../../../../contexts/Font/store'
import { getFontVariationSettings } from '../../../../../../contexts/Font/utils'
import Rotation from '../Rotation'
import type { IFrame } from './interfaces'
import styles from './styles.module.scss'

const Frame = ({ glyph }: IFrame) => {
  const { font } = useFontStore()
  const frame = glyph?.frames[glyph.currentFrame]

  if (!frame) {
    return
  }

  return (
    <div className={styles['frame']}>
      <div className={styles['frame--option']} data-type="char">
        charIndex
        <p>{glyph?.charIndex}</p>
      </div>

      <div className={styles['frame--option']} data-type="rotation">
        <Rotation rotation={frame?.properties.rotation} />
      </div>

      <div
        className={styles['frame--current--glyph']}
        style={{
          fontFamily: font?.familyName,
          fontVariationSettings: getFontVariationSettings(frame?.axes ?? {})
        }}
      >
        {font?.getGlyph(glyph?.charIndex ?? 0).name}
      </div>

      <div className={styles['frame--option']} data-type="position">
        <p>Position</p>
        <p>
          x: {frame.position[0]}
          y: {frame.position[1]}
        </p>
      </div>
    </div>
  )
}

Frame.displayName = 'Form.Frame'
export default Frame
