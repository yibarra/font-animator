import { useEffect, useRef, useState } from 'react'

import type { IRangeSlider } from './interfaces'
import styles from './styles.module.scss'

const RangeSlider = ({
  defaultValue = 0,
  max = 100,
  min = 0,
  onHandler,
  step = 1,
  ...props
}: IRangeSlider) => {
  const [value, setValue] = useState<number>()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value) ?? 0

    setValue(newValue)

    if (typeof onHandler === 'function') {
      onHandler(newValue)
    }
  }

  // update frame
  useEffect(() => {
    if (defaultValue !== null) {
      const clamped = Math.max(min, Math.min(max, defaultValue))

      setValue(clamped)
    }
  }, [defaultValue, min, max])

  return (
    <div className={styles['range-slider']}>
      <div className={styles['range-slider--wrapper']}>
        <input
          {...props}
          max={max}
          min={min}
          step={step}
          ref={inputRef}
          onChange={handleChange}
          type="range"
          value={value ?? 0}
        />

        <div className={styles['range-slider--labels']}>
          <span className={styles['range-slider--labels--value']}>
            {String(min).padStart(2, '0')}
          </span>
          <span className={styles['range-slider--labels--value']}>{max}</span>
        </div>
      </div>
    </div>
  )
}

RangeSlider.displayName = 'Form.RangeSlider'
export default RangeSlider
