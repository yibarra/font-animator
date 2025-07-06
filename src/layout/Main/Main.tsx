import { Layer, Stage } from 'react-konva'
import { useCallback, useRef, useState } from 'react'

import { UseGlyphsContext } from '../../contexts/Glyphs/Glyphs'
import Glyph from '../../components/Glyph'
import Animator from '../../components/Animator'
import Form from '../../components/Form'
import Grid from '../../components/Grid/Grid'
import { useGridContext } from '../../contexts/Grid'
import type { Stage as IStage } from 'konva/lib/Stage'
import MenuContext from '../../components/MenuContext'

const Main = () => {
  const stageRef = useRef<IStage>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const { glyphs } = UseGlyphsContext()
  const { offsetX, offsetY, setOffsetX, setOffsetY } = useGridContext();

  const handleDragEnd = useCallback(() => {
    if (stageRef.current) {
      // setOffsetX(stageRef.current.x())
      // setOffsetY(stageRef.current.y())
    }

    setIsDragging(false)
  }, [setOffsetX, setOffsetY])

  return (
    <>
      <MenuContext menuItems={<Form.Letter />}>
        <Stage
          draggable
          x={offsetX}
          y={offsetY}
          ref={stageRef}
          height={window.innerHeight}
          width={window.innerWidth}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
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
                data={glyph}
                key={index}
                isPlaying={isPlaying}
              />
            )}
          </Layer>
        </Stage>
      </MenuContext>

      <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
        <Animator duration={900} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>

      
      
      <Glyph.Form />
    </>
  )
}

Main.displayName = 'Layout.Main'
export default Main