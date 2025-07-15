import { useMemo, useState } from 'react'
import { UseFontContext } from '../../../../../../contexts/Font/Font'
import { Tabs } from './Composite'
import type { IFrame } from './interfaces'
import styles from './styles.module.scss'

const Frame = ({ frame, glyph }: IFrame) => {
  const { font } = UseFontContext()

  const [isActive, setIsActive] = useState(0)

  const GLYPHS_PER_TAB = 48
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

  if (!frame || totalGlyphs === 0) {
    return
  }

  return (
    <div className={styles['frame']}>
      <Tabs.Tabs defaultActiveTab={0}>
        <Tabs.TabHead items={tabData} callback={setIsActive} />

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

Frame.displayName = 'Form.Frame'
export default Frame
