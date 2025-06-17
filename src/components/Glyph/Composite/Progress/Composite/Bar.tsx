import styles from '../styles.module.scss'

interface IProgressSVG {
  percentage: number
  size?: number
  strokeWidth?: number
}

const Bar = ({
  percentage,
  size = 100,
  strokeWidth = 2,
}: IProgressSVG) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const strokeDashoffsetValue = circumference - (percentage / 100) * circumference

  const centerX = radius
  const centerY = radius

  return (
    <div
      className={styles['progress']}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg
        className={styles['progress--svg']}
        height={size}
        width={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className={styles['progress--bar']}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffsetValue}
          transform={`rotate(-90 ${centerX + strokeWidth / 2} ${centerY + strokeWidth / 2})`}
        />
      </svg>
    </div>
  )
}

Bar.displayName = 'Progress.Bar'
export default Bar