import { useFontStore } from '../../../../../../contexts/Font/store'
import { getFontVariationSettings } from '../../../../../../contexts/Font/utils'
import { UseGlyphsContext } from '../../../../../../contexts/Glyphs/Glyphs'
import Rotation from '../Rotation'
import type { IFrame } from './interfaces'
import styles from './styles.module.scss'

const Frame = ({ currentFrame, glyph }: IFrame) => {
  const { font } = useFontStore()
    const { setGlyphProperties } = UseGlyphsContext()

  const frame = glyph.frames[currentFrame]

  return (
    <div className={styles['frame']}>
      <div className={styles['frame--option']} data-type="char">
        <p className={styles['frame--option--description']}>
          <strong>{glyph?.charIndex}</strong>
        </p>
      </div>

      <div className={styles['frame--option']} data-type="rotation">
        <Rotation size={10} rotation={glyph?.rotate} />
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
          {font?.getGlyph(glyph?.charIndex ?? 0).name}
        </h4>
      </div>

      <div className={styles['frame--option']} data-type="position">
        <p className={styles['frame--option--description']}>
          x: <strong>{frame.position[0]}</strong>
          y: <strong>{frame.position[1]}</strong>
        </p>
      </div>

      <div className={styles['frame--option']} data-type="color">
        <input
          type="color"
          defaultValue={String(glyph?.properties.fill ?? '#000')}
          id="fill"
          onChange={(e) => setGlyphProperties({ fill: e.target.value })}
        />
      </div>
    </div>
  )
}

Frame.displayName = 'Form.Frame'
export default Frame
