import { Layer, Stage } from 'react-konva'
import { useRef } from 'react'
import type { Stage as IStage } from 'konva/lib/Stage'

import { UseGridContext } from '../../contexts/Grid'
import { useGlyphsStore } from '../../contexts/Glyphs/store'
import Form from '../../components/Form'
import Glyph from '../../components/Glyph'
import Grid from '../../components/Grid/Grid'
import GlyphSelector from '../../components/GlyphSelector'
import MenuContext from '../../components/MenuContext'

const Main = () => {
  const stageRef = useRef<IStage>(null)

  const { current, glyphs } = useGlyphsStore()
  const { offsetX, offsetY } = UseGridContext()

  return (
    <>
      <MenuContext menuItems={<Form.Letter />}>
        <Stage
          ref={stageRef}
          height={window.innerHeight}
          width={window.innerWidth}
        >
          <Layer>
            <Grid
              cellSize={48}
              height={window.innerHeight}
              offsetX={offsetX}
              offsetY={offsetY}
              dash={[2, 2]}
              stroke="#FFF"
              strokeWidth={0.1}
              opacity={0.8}
              width={window.innerWidth}
            />

            <Grid
              cellSize={12}
              height={window.innerHeight}
              offsetX={offsetX}
              offsetY={offsetY}
              dash={[2, 2]}
              stroke="#FFF"
              strokeWidth={0.1}
              opacity={0.6}
              width={window.innerWidth}
            />

            {Array.isArray(glyphs) && glyphs.map((glyph, index) =>
              <Glyph.Letter
                current={index === current}
                data={glyph}
                index={index}
                key={index}
              />
            )}
          </Layer>
        </Stage>
      </MenuContext>

      <Form.Glyph />

      <GlyphSelector />
    </>
  )
}

Main.displayName = 'Layout.Main'
export default Main