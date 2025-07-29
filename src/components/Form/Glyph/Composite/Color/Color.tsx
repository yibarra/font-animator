import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import type { IColor } from './interfaces'
import { useGlyphsStore } from '../../../../../contexts/Glyphs/store'

const Color = ({ color, id, property }: IColor) => {
  const { updateGlyphProperties } = useGlyphsStore()
  const [searchParams] = useSearchParams()
  const current = searchParams.get('glyph')

  const [inputValue, setInputValue] = useState(String(color ?? '#000'))

  useEffect(() => {
    setInputValue(String(color ?? '#000'))
  }, [current, color])

  return (
    <input
      onChange={({ target: { value }}) => {
        setInputValue(value)
        updateGlyphProperties(id, { [property]: value })
      }}
      type="color"
      value={inputValue}
    />
  )
}

Color.displayName = 'Components.Glyph.Form.Color'
export default Color