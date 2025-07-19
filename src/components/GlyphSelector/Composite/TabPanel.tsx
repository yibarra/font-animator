import { UseFontContext } from '../../../contexts/Font/Font'
import { getFontVariationSettings } from '../../../contexts/Font/utils'
import { UseFontSettingsContext } from '../../../contexts/FontSettings/FontSettings'
import { useGlyphsStore } from '../../../contexts/Glyphs/store'
import type { ITabPanelProps } from './interfaces'
import styles from './styles.module.scss'

const TabPanel = ({ id, items, frame, isActive }: ITabPanelProps) => {
  const { font } = UseFontContext()
  const { axes } = UseFontSettingsContext()
  const { updateGlyph } = useGlyphsStore()

  return (
    <div
      className={styles['tabs--panel']}
      data-active={isActive}
      hidden={!isActive}
    >
      <p>Glifos del {items.startIndex} al {items.endIndex}</p>
      <div className={styles['tabs--panel--grid']}>
        {items.glyphIndexes.map((g, i) => (
          <button
            className={styles['frame--item']}
            data-active={i === g}
            onClick={() => updateGlyph(id, g)}
            key={font?.familyName + '-' + i}
          >
            <p
              style={{
                fontFamily: font?.familyName,
                fontVariationSettings: axes ? getFontVariationSettings(frame['axes']) : ''
              }}
            >
              {font?.stringsForGlyph(g)}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

TabPanel.displayName = 'Components.Glyph.Form.Frame.TabPanel'
export default TabPanel