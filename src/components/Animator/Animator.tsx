import { useState } from 'react'

import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import Counter from './Counter'
import Form from '../Form'
import type { IAnimator } from './interfaces'

const Animator = ({ duration = 2000, isPlaying, setIsPlaying }: IAnimator) => {
  const { setGlyphFramesAxesAnimation } = UseGlyphsContext()
  const [loop, isLoop] = useState(true)

  return (
    <div>
      <Form.Loader />

      <button onClick={() => isLoop((prev) => !prev)}>
        <span className="material-symbols-outlined">
          {!loop ? 'timer_1' : 'all_inclusive'}
        </span>
      </button>

      <Counter
        start={0}
        end={100}
        duration={duration}
        loop={loop}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onChange={(value) => {
          setGlyphFramesAxesAnimation(value)
        }}
      />
    </div>
  )
}

Animator.displayName = 'Components.Animator'
export default Animator