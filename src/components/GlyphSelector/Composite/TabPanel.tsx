import { useFontStore } from '../../../contexts/Font/store'
import { useGlyphsStore } from '../../../contexts/Glyphs/store'
import { getFontVariationSettings } from '../../../contexts/Font/utils'
import { UseFontSettingsContext } from '../../../contexts/FontSettings'
import type { ITabPanelProps } from './interfaces'
import styles from './styles.module.scss'

const TabPanel = ({ id, items, frame, isActive }: ITabPanelProps) => {
  const { font } = useFontStore()
  const { axes } = UseFontSettingsContext()
  const { current, glyphs, updateGlyph } = useGlyphsStore()

  const currentGlyph = glyphs[current ?? 0].charIndex

  if (!isActive) {
    return <></>
  }

  return (
    <div
      className={styles['tabs--panel']}
      data-active={isActive}
    >
      <div className={styles['tabs--panel--grid']}>
        {items.glyphIndexes.map((g, i) => (
          <button
            className={styles['frame--item']}
            data-active={g === currentGlyph}
            data-chart-index={i}
            onClick={() => updateGlyph(id, g)}
            key={font?.familyName + '-' + i}
          >
            <p
              data-char={g}
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