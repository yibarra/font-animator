import { useMemo, useState } from 'react'

import { Tabs } from './Composite'
import Form from '../Form'
import { useMainStore } from '../../contexts/Main/store'
import { useFontStore } from '../../contexts/Font/store'
import { useGlyphsStore } from '../../contexts/Glyphs/store'
import { UseGlyphsContext } from '../../contexts/Glyphs'
import styles from './styles.module.scss'

const GlyphSelector = () => {
  const { font } = useFontStore()
  const { current, glyphs } = useGlyphsStore()
  const { saveLocalStorage } = UseGlyphsContext()
  const { isOpenSelector, setIsOpenSelector } = useMainStore()

  const [isActive, setIsActive] = useState(0)

  const GLYPHS_PER_TAB = 200
  const totalGlyphs = font?.numGlyphs ?? 0

  const tabData = useMemo(() => {
    const tabs = []
    const numTabs = Math.ceil(totalGlyphs / GLYPHS_PER_TAB)

    for (let i = 0; i < numTabs; i++) {
      const startIndex = i * GLYPHS_PER_TAB
      const endIndex = Math.min(startIndex + GLYPHS_PER_TAB, totalGlyphs) - 1 // -1 para que sea inclusivo

      tabs.push({
        label: `${startIndex + 1} - ${endIndex + 1}`,
        startIndex: startIndex,
        endIndex: endIndex,
        glyphIndexes: Array.from({ length: endIndex - startIndex + 1 }, (_, j) => startIndex + j),
      })
    }
    return tabs
  }, [totalGlyphs])

  const glyph = glyphs[current ?? 0]
  const frame = glyph && glyph?.frames[0]

  if (!frame || totalGlyphs === 0) {
    return
  }

  return (
    <div
      className={styles['glyph-selector']}
      data-active={isOpenSelector}
    >
      <div className={styles['glyph-selector--header']}>
        <button
          className={styles['glyph-selector--toggle']}
          onClick={() => setIsOpenSelector(!isOpenSelector)}
        >
          <span className="material-symbols-outlined">
            letter_switch
          </span>
        </button>

        <button
          className={styles['glyph-selector--toggle']}
          onClick={() => saveLocalStorage()}
        >
          <span className="material-symbols-outlined">
            save
          </span>
        </button>

        <Form.Loader />
      </div>

      <Tabs.Tabs defaultActiveTab={0}>
        <Tabs.TabHead isActive={isActive} items={tabData} callback={setIsActive} />

        <>
          {Array.isArray(tabData) && tabData.map((tab, index) => (
            <Tabs.TabPanel
              id={glyph.id}
              frame={frame}
              items={tab}
              key={index}
              isActive={isActive === index}
            />
          ))}
        </>
      </Tabs.Tabs>
    </div>
  )
}

GlyphSelector.displayName = 'Components.GlyphSelector'
export default GlyphSelector
