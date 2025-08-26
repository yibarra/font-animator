import { useEffect, useState } from 'react'

import Form from '../../..'
import Instances from './Instances'
import styles from '../../styles.module.scss'
import { UseFontSettingsContext } from '../../../../../contexts/FontSettings'
import { useGlyphsStore } from '../../../../../contexts/Glyphs/store'
import type { IAxes } from './interfaces'

const Axes = ({ currentFrame, char, id, frame }: IAxes) => {
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
      <div className={styles['form--glyph--axes']}>
        <div className={styles['form--glyph--axes--controls']}>
          {axes && Object.keys(axes ?? {}).map((axe, i) => (
            <div
              className={styles['form--glyph--axes--controls--item']}
              key={i}
            >
              <p>{axes && axes[axe]?.name}</p>

              <div className={styles['form--glyph--axes--controls--item--range']}>
                <Form.RangeSlider
                  {...axes[axe]}
                  onHandler={(value) => {
                    const newAxes = ({
                      ...axesState,
                      [axe]: Number(value),
                    })

                    setAxesState(newAxes)
                    updateGlyphAxes(id ?? '', newAxes, currentFrame)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Instances
        currentFrame={currentFrame}
        char={char}
        id={id}
        frame={frame}
      />
    </>
  )
}

Axes.displayName = 'Components.Glyph.Form.Axes'
export default Axes