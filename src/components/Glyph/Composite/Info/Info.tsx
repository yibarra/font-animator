import { Html } from 'react-konva-utils'

import type { IInfo } from './interfaces'
import styles from './style.module.scss'

const Info = ({
  baseLines,
  bounding,
  metrics,
  commands,
  skeleton,
  setBaseLines,
  setMetrics,
  setSkeleton,
  x,
  y,
}: IInfo) => {
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

          <button data-active="true" onClick={() => console.info("yeah")}>
            <span className="material-symbols-outlined">rotate_right</span>
          </button>
        </div>

        <div className={styles["glyph--info--contours--wrapper"]}>
          <p>Commands</p>

          <div
            className={styles["glyph--info--contours"]}
            style={{
              maxHeight: Math.abs(bounding.y2),
            }}
          >
            {Array.isArray(commands) &&
              commands.map((point, index) => {
                const argNamesMap: Record<string, string[]> = {
                  moveTo: ["x", "y"],
                  lineTo: ["x", "y"],
                  quadraticCurveTo: ["cp1x", "cp1y", "x", "y"],
                  bezierCurveTo: ["cp1x", "cp1y", "cp2x", "cp2y", "x", "y"],
                  closePath: [],
                };

                const argNames = argNamesMap[point.command]
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
      </div>
    </Html>
  )
}

Info.displayName = 'Glyph.Info'
export default Info
