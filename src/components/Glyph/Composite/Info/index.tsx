import { Html } from 'react-konva-utils'

import { UseGlyphContext } from '../../Context'
import { useGlyphsStore } from '../../../../contexts/Glyphs/store'
import styles from './style.module.scss'
import type { IInfo } from './interfaces'

const Info = ({
  rotation,
  x,
  y,
}: IInfo) => {
  const { remove } = useGlyphsStore()
  const { data, path, state, updateState } = UseGlyphContext()

  const { id } = data
  const { commands, bounding } = path
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

          <button
            data-active={metrics}
            onClick={() => updateState('metrics', !metrics)}
          >
            <span className="material-symbols-outlined">straighten</span>
          </button>

          <button
            className={styles['glyph--info--controls--disabled']}
          />

          <button
            data-active={baseLines}
            onClick={() => updateState('baseLines', !baseLines)}
          >
            <span className="material-symbols-outlined">square_foot</span>
          </button>

          <button
            data-active={viewCommands}
            onClick={() => updateState('viewCommands', !viewCommands)}
          >
            <span className="material-symbols-outlined">code_blocks</span>
          </button>

          <button
            data-active="true"
            onClick={() => remove(id)}
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>

        {viewCommands && (
          <div
            className={styles["glyph--info--wrapper"]}
            style={{
              left: `calc(50% + (${(bounding.x2 - bounding.x1)}px / 2))`
            }}
          >
            <div className={styles["glyph--info--group"]}>
              <p>chart Index: <strong>{data.charIndex}</strong></p>
              <p>rotation: <strong>{rotation}</strong>deg</p>
              <p>position: x = <strong>{x}</strong>, y = <strong>{y}</strong></p>
            </div>

            <div className={styles["glyph--info--group"]}>
              <h6>Bounding Box</h6>

              <div className={styles["glyph--info--wrapper--group"]}>
                <p>X1: <strong>{bounding.x1}</strong></p>
                <p>Y1: <strong>{bounding.y1}</strong></p>
              </div>
              <div className={styles["glyph--info--wrapper--group"]}>
                <p>X2: <strong>{bounding.x2}</strong></p>
                <p>Y2: <strong>{bounding.y2}</strong></p>
              </div>
              <div className={styles["glyph--info--wrapper--group"]}>
                <p>Width: <strong>{bounding.x2 - bounding.x1}</strong></p>
                <p>Height: <strong>{Math.abs(bounding.y2) + Math.abs(bounding.y1)}</strong></p>
              </div>
            </div>

            <div className={styles["glyph--info--group"]}>
              <h6>Commands</h6>

              <div
                className={styles["glyph--info--contours"]}
                style={{
                  maxHeight: Math.abs(bounding.y2),
                }}
              >
                {Array.isArray(commands) &&
                  commands.map((point, index) => {
                    const argNames = point.command
                    const args: (number | null)[] = [...point.args]

                    while (args.length < 6) {
                      args.push(null)
                    }

                    const displayedArgs = args.slice(0, 6)

                    return (
                      <p
                        className={styles["glyph--info--contours--item"]}
                        key={index}
                      >
                        {displayedArgs.map((value, k) => (
                          value !== null ? <>{argNames[k].toUpperCase() || `arg${(k + 1)}`}: <strong>{value}</strong></> : null
                        ))}
                      </p>
                    )
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </Html>
  )
}

Info.displayName = 'Glyph.Info'
export default Info
