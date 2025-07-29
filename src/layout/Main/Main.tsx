import { Layer, Stage } from 'react-konva'
import { useRef, useState } from 'react'

import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import Animator from '../../components/Animator'
import Form from '../../components/Form'
import Glyph from '../../components/Glyph'
import Grid from '../../components/Grid/Grid'
import GlyphSelector from '../../components/GlyphSelector'
import MenuContext from '../../components/MenuContext'
import { useGridContext } from '../../contexts/Grid'
import type { Stage as IStage } from 'konva/lib/Stage'

const Main = () => {
  const stageRef = useRef<IStage>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isOpenSelector, setIsOpenSelector] = useState(false)

  const { current, glyphs } = UseGlyphsContext()
  const { offsetX, offsetY } = useGridContext()

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
              offsetX={offsetX}
              offsetY={offsetY}
              cellSize={22}
              gridColor="#fff"
            />

            {Array.isArray(glyphs) && glyphs.map((glyph, index) =>
              <Glyph.Letter
                current={index === current}
                data={glyph}
                index={index}
                key={index}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                isPlaying={isPlaying}
              />
            )}
          </Layer>
        </Stage>
      </MenuContext>

      <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
        <Animator duration={900} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        <Form.Glyph />
      </div>

      <GlyphSelector isOpen={isOpenSelector} setIsOpen={setIsOpenSelector} />
    </>
  )
}

Main.displayName = 'Layout.Main'
export default Main