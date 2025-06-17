import { useRef, useState } from 'react'

import type { IRangeSlider } from './interfaces'
import styles from './styles.module.scss'

const RangeSlider = ({
  defaultValue = 50,
  max = 100,
  min = 0,
  onChange,
  step = 1,
}: IRangeSlider) => {
  const initialValue = Math.max(min, Math.min(max, defaultValue))
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value)

    setValue(newValue)

    if (onChange) {
      onChange(newValue)
    }
  }

  const percent = ((value - min) / (max - min)) * 100

  return (
    <div className={styles['range-slider']}>
      <div className={styles['range-slider--wrapper']}>
        <input
          max={max}
          min={min}
          step={step}
          ref={inputRef}
          onChange={handleChange}
          type="range"
          value={value}
        />

        <div
          className={styles['range-slider--value-marker']}
          style={{
            left: `${percent}%`  // ((value - min) / (max - min)) * 100 + '%'
          }}
        >
          {value}
        </div>

        <div className={styles['range-slider--min-max-labels']}>
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  )
}

RangeSlider.displayName = 'Form.RangeSlider'
export default RangeSlider
