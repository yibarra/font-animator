import { Layer, Stage } from 'react-konva'

import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import Glyph from '../../components/Glyph'
import Form from '../../components/Glyph/Composite/Form'
import { useState } from 'react'

const Main = () => {
  const { glyphs, current } = UseGlyphsContext()
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {Array.isArray(glyphs) && glyphs.map((glyph, index) =>
            <Glyph current={current === glyph.id} data={glyph} key={index} isPlaying={isPlaying} />
          )}
        </Layer>
      </Stage>

      <button onClick={() => setIsPlaying((e) => !e)}>{isPlaying ? 'pause' : 'play'}</button>
      
      <Form glyph={glyphs.find((i) => i.id === current)} />
    </>
  )
}

Main.displayName = 'Layout.Main'
export default Main