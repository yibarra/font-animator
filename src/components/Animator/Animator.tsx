import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import SmoothCounter from './Counter'

const Animator = ({
  from = 0,
  to = 100,
  duration = 2000,
  loop,
  isPlaying,
  setIsPlaying,
}: any) => {
  const { setGlyphFramesAxesAnimation } = UseGlyphsContext()

  return (
    <div>
      <SmoothCounter
        start={from}
        end={to}
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


export default Animator