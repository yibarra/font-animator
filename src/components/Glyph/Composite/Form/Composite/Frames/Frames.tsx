import { useSearchParams } from 'react-router-dom'

import Rotation from '../Rotation'
import styles from './styles.module.scss'
import type { IFrames } from './interfaces'
import { UseGlyphsContext } from '../../../../../../contexts/Glyphs/Glyphs'
import GlyphSVG from '../../../../../GlyphSvg'

const Frames = ({ frame, glyph, ...props }: IFrames) => {
  const { setGlyphFramesAxesAnimation } = UseGlyphsContext()
  const [, setSearchParams] = useSearchParams()

  // on change current frame
  const onHandler = (current: number) => {
    const newParams = new URLSearchParams(window.location.search)
    newParams.set('frame', String(current))

    setGlyphFramesAxesAnimation(current ? 100 : 0)
    setSearchParams(newParams, { replace: true })
  }

  // render
  return (
    <div className={styles['frames']} {...props}>
      <div className={styles['frames--wrapper']}>
        {Array.isArray(glyph?.frames) && glyph.frames.map((item, index) => (
          <div
            className={styles['frames--frame']}
            data-active={frame === item}
            key={index}
          >
            <div className={styles['frames--glyph']}>
              <div className={styles['frames--frame--options']}>
                <Rotation size={10} rotation={item?.rotation} />
              </div>

              <button
                className={styles['frames--glyph--text']}
                data-active={frame === item}
                onClick={() => onHandler(index)}
              >
                <GlyphSVG
                  charIndex={glyph?.charIndex}
                  size={26}
                  properties={{ fill: glyph?.properties.fill?.toString() }}
                />
              </button>

              <div className={styles['frames--glyph--pos']}>
                <p>x: <span>{Number(item.position[0]).toFixed(2)}</span></p>
                <p>y: <span>{Number(item.position[1]).toFixed(2)}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Frames.displayName = 'Glyph.Form.Frames'
export default Frames
