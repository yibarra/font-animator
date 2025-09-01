import { Html } from 'react-konva-utils'

import { UseGlyphContext } from '../../Context'
import { useGlyphsStore } from '../../../../contexts/Glyphs/store'
import type { IInfo } from './interfaces'
import styles from './style.module.scss'

const Info = ({
  rotation,
  x,
  y,
}: IInfo) => {
  const { remove } = useGlyphsStore()
  const { data, path, state, updateState } = UseGlyphContext()

  const { id } = data
  const { bounding } = path
  const { metrics, skeleton, baseLines, viewCommands, viewPoints } = state

  return (
    <Html>
      <div
        className={styles["glyph--info"]}
        style={{
          left: x,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          top: y + Math.abs(bounding.y1 / 2),
        }}
      >
        <div className={styles["glyph--info--controls"]}>
          <button
            data-active={viewCommands}
            onClick={() => updateState('viewCommands', !viewCommands)}
          >
            <span className="material-symbols-outlined">code_blocks</span>
          </button>

          <div className={styles['glyph--info--controls--group']}>
            <button
              data-active={skeleton}
              onClick={() => updateState('skeleton', !skeleton)}
            >
              <span className="material-symbols-outlined">skeleton</span>
            </button>

            <button
              data-active={viewPoints}
              onClick={() => updateState('viewPoints', !viewPoints)}
            >
              <span className="material-symbols-outlined">point_scan</span>
            </button>
          </div>

          <button
            className={styles['glyph--info--controls--disabled']}
          />

          <div className={styles['glyph--info--controls--group']}>
            <button
              data-active={metrics}
              onClick={() => updateState('metrics', !metrics)}
            >
              <span className="material-symbols-outlined">straighten</span>
            </button>

            <button
              data-active={baseLines}
              onClick={() => updateState('baseLines', !baseLines)}
            >
              <span className="material-symbols-outlined">square_foot</span>
            </button>
          </div>

          <button
            data-active="true"
            onClick={() => remove(id)}
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </Html>
  )
}

Info.displayName = 'Glyph.Info'
export default Info
