import { useCallback, useEffect, useRef, useState } from 'react'

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
  const markerRef = useRef<HTMLDivElement>(null)

  const updateMarkerPosition = useCallback(() => {
    if (inputRef.current && markerRef.current) {
      const input = inputRef.current
      const marker = markerRef.current
      const thumbWidth = 16
      const fraction = (Number(input.value ?? 0) - min) / (max - min)
      
      marker.style.left = `calc(${fraction * 100}% + ${(0.5 - fraction) * thumbWidth}px)`
    }
  }, [max, min, inputRef])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value)

    setValue(newValue)

    if (onChange) {
      onChange(newValue)
    }
  }

  useEffect(() => {
    updateMarkerPosition()
  }, [value, min, max, updateMarkerPosition])

//  const percent = ((value - min) / (max - min)) * 100

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
          ref={markerRef}
          className={styles['range-slider--value-marker']}
        >
          {value}
        </div>

        <div className={styles['range-slider--min-max-labels']}>
          <span className={styles['range-slider--min-max-labels--value']}>
            {String(min).padStart(2, '0')}
          </span>
          <span className={styles['range-slider--min-max-labels--value']}>{max}</span>
        </div>
      </div>
    </div>
  )
}

RangeSlider.displayName = 'Form.RangeSlider'
export default RangeSlider
