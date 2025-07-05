import { useFontStore } from '../../../../../../contexts/Font/store'
import { getFontVariationSettings } from '../../../../../../contexts/Font/utils'
import GlyphSVG from '../../../../../GlyphSvg'
import Color from '../Color'
import Rotation from '../Rotation'
import type { IFrame } from './interfaces'
import styles from './styles.module.scss'

const Frame = ({ frame, glyph }: IFrame) => {
  const { font } = useFontStore()

  if (!frame) {
    return
  }

  console.info(frame)

  return (
    <div className={styles['frame']}>
      <div className={styles['frame--option']} data-type="char">
        <p className={styles['frame--option--description']}>
          <strong>{glyph?.charIndex}</strong>
        </p>
      </div>

      <div className={styles['frame--option']} data-type="rotation">
        <Rotation size={10} rotation={frame?.rotation} />
      </div>

      <div
        className={styles['frame--current--glyph']}
        style={{
          fontFamily: font?.familyName,
          fontVariationSettings: getFontVariationSettings(frame?.axes ?? {})
        }}
      >
        <span /><span /><span /><span />
        <GlyphSVG
          charIndex={glyph?.charIndex}
          size={130}
          properties={{ fill: glyph?.properties.fill?.toString() }}
        />
      </div>

      <div className={styles['frame--option']} data-type="position">
        <p className={styles['frame--option--description']}>
          x: <strong>{Number(frame.position[0]).toFixed(2)}</strong>
          y: <strong>{Number(frame.position[1]).toFixed(2)}</strong>
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
