import { useEffect, useRef, useState } from 'react'
import BezierEasing from 'bezier-easing'

import type { CounterProps } from './interfaces'

const Counter = ({
  start = 0,
  end = 100,
  duration = 2000,
  loop = false,
  easing = [.17,.67,.83,.67], // ease
  onChange,
  setIsPlaying,
  isPlaying,
}: CounterProps) => {
  const [direction, setDirection] = useState<'up' | 'down'>(start < end ? 'up' : 'down')
  
  const valueRef = useRef(start ?? 0)
  const animationRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number | undefined>(undefined)
  const fromRef = useRef(start)
  const toRef = useRef(end)

  const easingFn = BezierEasing(...easing)

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp
    }

    const elapsed = timestamp - startTimeRef.current
    const rawProgress = Math.min(elapsed / duration, 1)
    const easedProgress = easingFn(rawProgress)

    const nextValue = fromRef.current + (toRef.current - fromRef.current) * easedProgress
    valueRef.current = (Math.round(nextValue))
    onChange?.(Math.round(nextValue))

    if (rawProgress < 1) {
      animationRef.current = requestAnimationFrame(animate)
    } else if (loop) {
      setDirection(prev => (prev === 'up' ? 'down' : 'up'))

      fromRef.current = toRef.current
      toRef.current = fromRef.current === start ? end : start
      startTimeRef.current = undefined
      animationRef.current = requestAnimationFrame(animate)
    } else {
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      fromRef.current = valueRef.current
      toRef.current = direction === 'up' ? end : start
      startTimeRef.current = undefined
      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, direction])

  return (
    <div>
      <button onClick={() => setIsPlaying(true)}>
        <span className="material-symbols-outlined">
          {!isPlaying ? 'play_arrow' : 'resume'}
        </span>
      </button>
      <button onClick={() => {
        valueRef.current = 0

        setIsPlaying(false)
        onChange?.(0)
      }}>
        <span className="material-symbols-outlined">
          stop
        </span>
      </button>
    </div>
  )
}

Counter.displayName = 'Components.Animator.Counter'
export default Counter
