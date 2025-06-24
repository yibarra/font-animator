import { Layer, Stage } from 'react-konva'
import { useState } from 'react'

import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import Glyph from '../../components/Glyph'
import Animator from '../../components/Animator'
import Form from '../../components/Form'

const Main = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const { glyphs } = UseGlyphsContext()

  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {Array.isArray(glyphs) && glyphs.map((glyph, index) =>
            <Glyph.Letter
              data={glyph}
              key={index}
              isPlaying={isPlaying}
            />
          )}
        </Layer>
      </Stage>

      <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
        <Animator duration={900} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>

      <Form.Letter />
      
      <Glyph.Form />
    </>
  )
}

Main.displayName = 'Layout.Main'
export default Main