import { Layer, Stage } from 'react-konva'

import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import Glyph from '../../components/Glyph'
import Form from '../../components/Glyph/Composite/Form'

const Main = () => {
  const { glyphs, current } = UseGlyphsContext()

  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {Array.isArray(glyphs) && glyphs.map((glyph, index) =>
            <Glyph current={current === glyph.id} data={glyph} key={index} />
          )}
        </Layer>
      </Stage>
      
      <Form current={current} />
    </>
  )
}

Main.displayName = 'Layout.Main'
export default Main