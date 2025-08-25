
import { UseFontContext } from '../../../contexts/Font/Font'

import styles from './styles.module.scss'

const Info = () => {
  const { font } = UseFontContext()

  const info = {
    familyName: font?.familyName,
    subfamilyName: font?.subfamilyName,
    postscriptName: font?.postscriptName,
    copyright: font?.copyright,
    version: font?.version,
    numGlyphs: font?.numGlyphs,
    unitsPerEm: font?.unitsPerEm,
    ascender: font?.ascent,
    descender: font?.descent,
    lineGap: font?.lineGap,
  }

  return (
    <div className={styles['glyph-selector--info']}>
      <div className={styles['glyph-selector--info--section']}>
        <p><strong>FamilyName:</strong> {info.familyName}</p>
        <p><strong>SubFamily:</strong> {info.subfamilyName}</p>
        <p><strong>Postscript Name:</strong> {info.postscriptName}</p>
        <p><strong>Version:</strong> {info.version}</p>
      </div>

      <div className={styles['glyph-selector--info--section']}>
        <p><strong>Units per Em:</strong> {info.unitsPerEm}</p>
        <p><strong>Ascender:</strong> {info.ascender}</p>
        <p><strong>Descender:</strong> {info.descender}</p>
        <p><strong>Line Gap:</strong> {info.lineGap}</p>
      </div>
    </div>
  )
}

Info.displayName = 'GlyphSelector.Composite.Info'
export default Info