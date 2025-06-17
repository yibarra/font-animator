import { useMemo } from 'react'

import styles from '../styles.module.scss'

interface IPieSVG {
  percentage: number
  size?: number
}

const Pie = ({ percentage, size = 100 }: IPieSVG) => {
  const radius = size / 2
  const centerX = radius
  const centerY = radius

  const angle = (Math.max(0, Math.min(100, percentage)) / 100) * 360

  const pathData = useMemo(() => {
    if (percentage === 100) {
      return `
        M ${centerX},${centerY}
        m ${-radius}, 0
        a ${radius},${radius} 0 1,0 ${radius * 2},0
        a ${radius},${radius} 0 1,0 ${-radius * 2},0
      `
    }

    if (percentage === 0) {
      return ''
    }

    const radians = (angle * Math.PI) / 180

    const endX = centerX + radius * Math.cos(radians)
    const endY = centerY + radius * Math.sin(radians)

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `
      M ${centerX},${centerY}
      L ${centerX + radius},${centerY}
      A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}
      Z
    `
  }, [percentage, radius, centerX, centerY, angle])

  return (
    <div
      className={styles['progress']}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <svg
        className={styles['progress--svg']}
        height={size}
        width={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <path
          className={styles['progress--pie']}
          d={pathData}
          transform={`rotate(-90 ${centerX} ${centerY})`}
        />
      </svg>
    </div>
  )
}

Pie.displayName = 'Components.Progress.Pie'
export default Pie