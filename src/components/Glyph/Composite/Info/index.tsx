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
          top: y + Math.abs(bounding.y1 / 2) + 6,
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
          <div className={styles["glyph--info--contours--wrapper"]}>
            <div>
              <p>chart Index: {data.charIndex}</p>
              <p>rotate: {rotation}</p>
              <p>position x: {x}, y: {y}</p>
            </div>
            <div>
              <h6>Bounding Box</h6>
              <p>X1: {bounding.x1}</p>
              <p>Y1: {bounding.y1}</p>
              <p>X2: {bounding.x2}</p>
              <p>Y2: {bounding.y2}</p>
              <p>Width: {bounding.x2 - bounding.x1}</p>
              <p>Height: {Math.abs(bounding.y2) + Math.abs(bounding.y1)}</p>
            </div>

            <div>
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
                          value !== null ? <strong>{argNames[k] || `arg${k + 1}`}: {value}</strong> : null
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
