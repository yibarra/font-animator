import { Layer, Stage } from 'react-konva'

import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import Glyph from '../../components/Glyph'
import Form from '../../components/Glyph/Composite/Form'

const Main = () => {
  const { glyphs } = UseGlyphsContext()

  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {Array.isArray(glyphs) && glyphs.map((glyph, index) =>
            <Glyph glyph={glyph} key={index} />
          )}
        </Layer>
      </Stage>
      
      <Form />
    </>
  )
}

Main.displayName = 'Layout.Main'
export default Main