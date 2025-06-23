import { useFontStore } from '../../../../../../contexts/Font/store'
import { getFontVariationSettings } from '../../../../../../contexts/Font/utils'
import { uniNameCode } from '../../../../../../contexts/Glyphs/utils'
import Color from '../Color'
import Rotation from '../Rotation'
import type { IFrame } from './interfaces'
import styles from './styles.module.scss'

const Frame = ({ currentFrame, glyph }: IFrame) => {
  const { font } = useFontStore()

  const frame = glyph.frames[currentFrame]

  return (
    <div className={styles['frame']}>
      <div className={styles['frame--option']} data-type="char">
        <p className={styles['frame--option--description']}>
          <strong>{glyph?.charIndex}</strong>
        </p>
      </div>

      <div className={styles['frame--option']} data-type="rotation">
        <Rotation size={10} rotation={frame.rotate} />
      </div>

      <div
        className={styles['frame--current--glyph']}
        style={{
          fontFamily: font?.familyName,
          fontVariationSettings: getFontVariationSettings(frame?.axes ?? {})
        }}
      >
        <span /><span /><span /><span />
        <h4
          style={{ color: glyph?.properties.fill?.toString() }}
        >
          {uniNameCode(font?.getGlyph(glyph?.charIndex ?? 0).name ?? '')}
        </h4>
      </div>

      <div className={styles['frame--option']} data-type="position">
        <p className={styles['frame--option--description']}>
          x: <strong>{frame.position[0]}</strong>
          y: <strong>{frame.position[1]}</strong>
        </p>
      </div>

      <div className={styles['frame--option']} data-type="color">
        <Color color={glyph?.properties?.fill ?? ''} property='fill' />
      </div>
    </div>
  )
}

Frame.displayName = 'Form.Frame'
export default Frame
