import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { UseFontContext } from '../../../../contexts/Font/Font'
import styles from './styles.module.scss'
import Axes from './Composite/Axes/Axes'
import Frame from './Composite/Frame'
import Frames from './Composite/Frames'
import Stroke from './Composite/Stroke/Stroke'
import type { IForm } from './interfaces'

const Form = ({ glyph, ...props }: IForm) => {
  const { handleFileChange } = UseFontContext()

  const [searchParams] = useSearchParams()
  const [currentFrame, setCurrentFrame] = useState<number>(0)

  useEffect(() => {
    const frame = searchParams.get('currentFrame')

    setCurrentFrame(Number(frame ?? 0))
  }, [searchParams])

  if (!glyph) {
    return
  }
  
  return (
    <div {...props} className={styles['form']}>
      <div>
        <label>NOVA FONT</label>
        <label htmlFor="file-upload">Escolha um arquivo:</label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
        />
      </div>

      <Frame currentFrame={currentFrame} glyph={glyph} />
      <Frames currentFrame={currentFrame} glyph={glyph} />

      <Axes currentFrame={currentFrame} glyph={glyph} />
      <Stroke currentFrame={currentFrame} glyph={glyph} />
    </div>
  )
}

Form.displayName = 'Component.Glyph.Form'
export default Form