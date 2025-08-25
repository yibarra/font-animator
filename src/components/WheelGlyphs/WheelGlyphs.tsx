import { useEffect, useRef, useState } from 'react'
import { Shape } from 'react-konva'
import type { IWheelGlyphsProps } from './interfaces'
import type { Context } from 'konva/lib/Context'

import { UseFontSettingsContext } from '../../contexts/FontSettings/FontSettings'
import { useGlyphsStore } from '../../contexts/Glyphs/store'
import { useFontStore } from '../../contexts/Font/store'

const WheelGlyphs = ({ glyph }: IWheelGlyphsProps) => {
  const [activeGlyphIndex, setActiveGlyphIndex] = useState<number | null>(null)
  const prevActiveGlyphIndexRef = useRef<number | null>(null)

  const { font } = useFontStore()
  const { getGlyphs } = UseFontSettingsContext()
  const { updateGlyph } = useGlyphsStore()

  const radius = 180
  const circleColor = 'transparent'
  const glyphSize = 12
  const numGlyphs = getGlyphs.length ?? 0
  const glyphColor = 'white'
  const rotation = 60

  const drawWheel = (ctx: Context) => {
    if (circleColor) {
      ctx.beginPath()
      ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI) // Centro en 0,0 relativo al Shape
      ctx.fillStyle = circleColor
      ctx.fill()
      ctx.closePath()
    }

    if (numGlyphs === 0) {
      return // No hay glifos para dibujar
    }

    const angleIncrement = (2 * Math.PI) / numGlyphs // 360 grados en radianes / numGlyphs

    ctx.font = `${glyphSize}px ${font?.familyName}` // Configura la fuente para los glifos
    ctx.fillStyle = glyphColor // Color para todos los glifos
    ctx.textAlign = 'center' // Centra horizontalmente el texto en su punto (0,0) local
    ctx.textBaseline = 'middle' // Centra verticalmente el texto en su punto (0,0) local

    getGlyphs.forEach((item, i) => {
      const angle = i * angleIncrement

      ctx.save()

      const glyphX = radius * Math.cos(angle - Math.PI / 2)
      const glyphY = radius * Math.sin(angle - Math.PI / 2)

      ctx.translate(glyphX, glyphY)
      ctx.rotate(angle)
      ctx.fillText(item.item, 0, 0)

      ctx.restore()
    })
  }

  const angleIncrementDegrees = numGlyphs > 0 ? 360 / numGlyphs : 0

  // useEffect para detectar cuándo un glifo específico está en el ángulo 0
  useEffect(() => {
    if (numGlyphs === 0) {
      if (activeGlyphIndex !== null) {
        setActiveGlyphIndex(null)
      }
      return
    }

    // Normalizar la rotación de la rueda a un valor entre 0 y 360 grados
    // (ej. -90 se convierte en 270, 450 se convierte en 90)
    const normalizedRotation = (rotation % 360 + 360) % 360

    // Calcular el ángulo en la rueda (sin rotar) que actualmente está en la posición de 0 grados
    // Si la rueda ha rotado 30 grados en sentido horario, el glifo que estaba en -30 grados ahora está arriba.
    // Entonces, el ángulo que "apunta" hacia arriba es `360 - normalizedRotation`
    const angleAtTop = (360 - normalizedRotation) % 360

    let newActiveIndex = -1
    let minDifference = Infinity

    // Iterar sobre todos los glifos para encontrar el más cercano al ángulo "arriba"
    for (let i = 0; i < numGlyphs; i++) {
      const glyphAngle = i * angleIncrementDegrees // Ángulo del glifo 'i' si la rueda no rotara
      
      // Calcular la diferencia angular más corta (considerando el cruce de 0/360)
      let diff = Math.abs(glyphAngle - angleAtTop)
      if (diff > 180) {
        diff = 360 - diff
      }

      if (diff < minDifference) {
        minDifference = diff
        newActiveIndex = i
      }
    }

    // Establecer un umbral para considerar que un glifo está "en" la posición 0 grados.
    // Esto evita que el glifo activo cambie constantemente con pequeñas fluctuaciones de rotación.
    // Se usa la mitad del espacio angular entre glifos.
    const threshold = angleIncrementDegrees / 2

    if (minDifference <= threshold && newActiveIndex !== -1) {
      // Si un nuevo glifo está activo y es diferente al anterior, actualizar el estado
      if (newActiveIndex !== prevActiveGlyphIndexRef.current) {
        setActiveGlyphIndex(newActiveIndex)
        
        updateGlyph(glyph?.id, getGlyphs[newActiveIndex].charCode)
        console.info(getGlyphs[newActiveIndex], newActiveIndex)
      }
    } else {
      // Si ningún glifo está claramente en la posición 0, o si se sale del umbral
      if (activeGlyphIndex !== null) {
        setActiveGlyphIndex(null)
      }
    }

    // Actualizar la referencia del índice activo anterior
    prevActiveGlyphIndexRef.current = activeGlyphIndex
  }, [rotation, numGlyphs, getGlyphs, angleIncrementDegrees, activeGlyphIndex, glyph?.id, updateGlyph]) // Dependencias del useEffect

  if (!glyph) {
    return
  }

  return (
    <Shape
      rotation={rotation}
      x={glyph?.position[0] + radius / 2}
      y={glyph?.position[1] - radius / 2}
      sceneFunc={drawWheel}
      fill="#fff"
    />
  )
}

WheelGlyphs.displayName = 'Components.WheelGlyphs'
export default WheelGlyphs;