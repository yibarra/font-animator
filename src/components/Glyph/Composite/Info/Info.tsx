import { Html } from 'react-konva-utils'

import type { IInfo } from './interfaces'
import styles from './style.module.scss'

const Info = ({
  baseLines,
  bounding,
  metrics,
  points,
  skeleton,
  setBaseLines,
  setMetrics,
  setSkeleton,
  x,
  y
}: IInfo) => {
  return (
    <Html>
      <div
        className={styles['glyph--info']}
        style={{
          left: x + bounding.x2 / 2 + 32,
          top: y
        }}
      >
        <div>
          <button onClick={() => setSkeleton(!skeleton)}>
            <span className="material-symbols-outlined">skeleton</span>
          </button>

          <button onClick={() => setMetrics(!metrics)}>
            <span className="material-symbols-outlined">straighten</span>
          </button>

          <button onClick={() => setBaseLines(!baseLines)}>
            <span className="material-symbols-outlined">
              format_line_spacing
            </span>
          </button>

          <button onClick={() => console.info('yeah')}>
            <span className="material-symbols-outlined">
              rotate_right
            </span>
          </button>
        </div>

        <div className={styles['glyph--info--contours--wrapper']} style={{ display: 'none' }}>
          <p>Contours</p>
          
          <div className={styles['glyph--info--contours']}>
            {Array.isArray(points) && points.map((point, index) => (
              <p className={styles['glyph--info--contours--item']} key={index}>
                <span>
                  x: <strong>{point.x.toFixed(0)}</strong>
                </span>
                <span>
                  y: <strong>{point.y.toFixed(0)}</strong>
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </Html>
  )
}

Info.displayName = 'Glyph.Info'
export default Info