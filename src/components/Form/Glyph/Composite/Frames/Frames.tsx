import { useSearchParams } from 'react-router-dom'

import Rotation from '../Rotation'
import { getFontVariationSettings } from '../../../../../contexts/Font/utils'
import { UseFontContext } from '../../../../../contexts/Font/Font'
import styles from './styles.module.scss'
import type { IFrames } from './interfaces'
import { UseGlyphsContext } from '../../../../../contexts/Glyphs/Glyphs'

const Frames = ({ charIndex, currentFrame, frames, ...props }: IFrames) => {
  const { setGlyphFramesAxesAnimation } = UseGlyphsContext()
  const { font } = UseFontContext()

  const [, setSearchParams] = useSearchParams()

  // on change current frame
  const onHandler = (index: number) => {
    const newParams = new URLSearchParams(window.location.search)
    newParams.set('frame', String(index))

    setGlyphFramesAxesAnimation(100 * (currentFrame ?? 1))
    setSearchParams(newParams, { replace: true })
  }

  // render
  return (
    <div className={styles['frames']} {...props}>
      <div className={styles['frames--wrapper']}>
        {Array.isArray(frames) && frames.map((item, index) => (
          <div
            className={styles['frames--frame']}
            data-active={currentFrame === index}
            key={index}
          >
            <div className={styles['frames--glyph']}>
              <div className={styles['frames--frame--options']}>
                <Rotation size={6} rotation={item?.rotation} />
              </div>

              <button
                className={styles['frames--glyph--text']}
                data-active={currentFrame === index}
                onClick={() => onHandler(index)}
                style={{
                  fontFamily: font?.familyName,
                  fontVariationSettings: getFontVariationSettings(item.axes)
                }}
              >
                {font?.stringsForGlyph(charIndex ?? 0)}
              </button>
            </div>

            <div className={styles['frames--glyph--pos']}>
              <p>x: <span>{Number(item.position[0]).toFixed(0)}</span></p>
              <p>y: <span>{Number(item.position[1]).toFixed(0)}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Frames.displayName = 'Glyph.Form.Frames'
export default Frames
