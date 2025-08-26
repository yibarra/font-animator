import { useState } from 'react'
import { Html } from 'react-konva-utils'

import type { IInfo } from './interfaces'
import styles from './style.module.scss'
import { useGlyphsStore } from '../../../../contexts/Glyphs/store'

const Info = ({
  baseLines,
  bounding,
  id,
  metrics,
  commands,
  skeleton,
  setBaseLines,
  setMetrics,
  setSkeleton,
  setViewPoints,
  viewPoints,
  x,
  y,
}: IInfo) => {
  const { remove } = useGlyphsStore()
  const [viewCommands, setViewCommands] = useState(false)

  return (
    <Html>
      <div
        className={styles["glyph--info"]}
        style={{
          left: x + bounding.x2 / 2 + 32,
          top: y,
        }}
      >
        <div className={styles["glyph--info--controls"]}>
          <button data-active={skeleton} onClick={() => setSkeleton(!skeleton)}>
            <span className="material-symbols-outlined">skeleton</span>
          </button>

          <button data-active={metrics} onClick={() => setMetrics(!metrics)}>
            <span className="material-symbols-outlined">straighten</span>
          </button>

          <button
            data-active={baseLines}
            onClick={() => setBaseLines(!baseLines)}
          >
            <span className="material-symbols-outlined">square_foot</span>
          </button>

          <button data-active={viewCommands} onClick={() => setViewCommands(!viewCommands)}>
            <span className="material-symbols-outlined">code_blocks</span>
          </button>

          <button data-active={viewPoints} onClick={() => setViewPoints(!viewPoints)}>
            <span className="material-symbols-outlined">point_scan</span>
          </button>

          <button data-active="true" onClick={() => remove(id)}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>

        {viewCommands && (
          <div className={styles["glyph--info--contours--wrapper"]}>
            <h5>Commands</h5>

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
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </Html>
  )
}

Info.displayName = 'Glyph.Info'
export default Info
