import { useEffect, useState } from 'react'

import { UseFontSettingsContext } from '../../../../../../contexts/FontSettings/FontSettings'
import Form from '../../../../../Form'
import styles from '../../styles.module.scss'
import type { IAxes } from './interfaces'
import { useGlyphsStore } from '../../../../../../contexts/Glyphs/store'
import Instances from './Instances'

const Axes = ({ glyph, frame }: IAxes) => {
  const { axes } = UseFontSettingsContext()
  const { updateGlyphAxes } = useGlyphsStore()

  const [axesState, setAxesState] = useState<Record<string, number>>({})

  useEffect(() => {
    if (axes && frame) {
      const initialAxes: Record<string, number> = {}

      Object.keys(axes).forEach((key) => {
        initialAxes[key] = Number(frame.axes[key] ?? axes[key]?.default ?? 0)
      })

      setAxesState(initialAxes)
    }
  }, [axes, frame])

  if (!frame) {
    return null
  }

  return (
    <>
      <div className={styles['form--axes']}>
        <div className={styles['form--group--title']}>
          <h2>Axes</h2>
          <p>These axes define how the font can change its appearance.</p>
        </div>

        <div className={styles['form--group']} data-group="2">
          {axes && Object.keys(axes ?? {}).map((axe, i) => (
            <div
              className={styles['form--axes--item']}
              key={i}
            >
              <p className={styles['form--group--label']}>{axes && axes[axe]?.name}</p>
              <Form.RangeSlider
                {...axes[axe]}
                defaultValue={axesState[axe]}
                onHandler={(value) => {
                  const newAxes = ({
                    ...axesState,
                    [axe]: Number(value),
                  })

                  console.info(newAxes, axesState)
                  setAxesState(newAxes)
                  updateGlyphAxes(glyph?.id ?? '', newAxes, 0)
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <Instances glyph={glyph} frame={frame} />
    </>
  )
}

Axes.displayName = 'Components.Glyph.Form.Axes'
export default Axes