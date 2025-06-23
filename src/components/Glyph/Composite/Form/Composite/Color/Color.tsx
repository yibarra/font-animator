import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { UseGlyphsContext } from '../../../../../../contexts/Glyphs/Glyphs'

const Color = ({ color, property }: { color: string | CanvasGradient, property: string }) => {
  const { setGlyphProperties } = UseGlyphsContext()
  const [searchParams] = useSearchParams()
  const current = searchParams.get('current')

  const [inputValue, setInputValue] = useState(String(color ?? '#000'))

  useEffect(() => {
    setInputValue(String(color ?? '#000'))
  }, [current, color])

  return (
    <input
      onChange={({ target: { value }}) => {
        setInputValue(value)
        setGlyphProperties({ [property]: value })
      }}
      type="color"
      value={inputValue}
    />
  )
}

Color.displayName = 'Components.Glyph.Form.Color'
export default Color