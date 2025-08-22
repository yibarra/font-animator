import { useMemo, useState } from 'react'

import { Tabs } from './Composite'
import { UseFontContext } from '../../contexts/Font/Font'
import styles from './styles.module.scss'
import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import type { IGlyphSelectorProps } from './interfaces'

const GlyphSelector = ({ isOpen, setIsOpen }: IGlyphSelectorProps) => {
  const { font } = UseFontContext()
  const { current, glyphs } = UseGlyphsContext()

  const [isActive, setIsActive] = useState(0)

  const GLYPHS_PER_TAB = 240
  const totalGlyphs = font?.numGlyphs ?? 0

  const tabData = useMemo(() => {
    const tabs = []
    const numTabs = Math.ceil(totalGlyphs / GLYPHS_PER_TAB)

    for (let i = 0; i < numTabs; i++) {
      const startIndex = i * GLYPHS_PER_TAB
      const endIndex = Math.min(startIndex + GLYPHS_PER_TAB, totalGlyphs) - 1 // -1 para que sea inclusivo

      tabs.push({
        label: `${startIndex} - ${endIndex}`,
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
    <div className={styles['glyph-selector']} data-active={isOpen}>
      <button
        className={styles['glyph-selector--toggle']}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="material-symbols-outlined">
          letter_switch
        </span>
      </button>

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
