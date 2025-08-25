import { useEffect, useRef, useState } from 'react'

import type { IRangeSlider } from './interfaces'
import styles from './styles.module.scss'
import { formatValue } from './helpers'

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

  const minLabel = formatValue(min)
  const maxLabel = formatValue(max)

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
          <span
            className={styles['range-slider--labels--value']}
            data-sign={minLabel.sign}
          >
            {minLabel.value}
          </span>
          <span
            className={styles['range-slider--labels--value']}
            data-sign={maxLabel.sign}
          >
            {maxLabel.value}
          </span>
        </div>
      </div>
    </div>
  )
}

RangeSlider.displayName = 'Form.RangeSlider'
export default RangeSlider
