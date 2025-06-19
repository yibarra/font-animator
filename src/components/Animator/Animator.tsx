import { useState } from 'react'
import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import SmoothCounter from './Counter'

const Animator = ({
  from = 0,
  to = 100,
  duration = 2000,
  loop
}: any) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const { setGlyphFrameAxes} = UseGlyphsContext()

  return (
    <div>
      <SmoothCounter
        duration={duration}
        loop={loop}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onChange={(value) => {
          setGlyphFrameAxes(0, 'wdth', Number(value ?? 0))
        }}
      />
    </div>
  )
}


export default Animator