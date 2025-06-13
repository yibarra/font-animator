import { useCallback, useRef } from 'react'

const FontSettings = () => {
  const wdthRef = useRef<number>(100)
  const wghtRef = useRef<number>(400)

  const applyVariationToBody = useCallback(() => {
    const bodyElement = document.body
      if (bodyElement) {
        const currentWdth = wdthRef.current
        const currentWght = wghtRef.current
        bodyElement.style.fontVariationSettings = `'wdth' ${currentWdth}, 'wght' ${currentWght}`
      }
  }, [])

  const handleWdthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    wdthRef.current = newValue 
    applyVariationToBody()
  }

  const handleWghtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    wghtRef.current = newValue 
    applyVariationToBody() 
  }

  return (
    <div>
      <input id="file" type="file" />
      
      <div style={{ padding: '20px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
        <h3>Control de Variación de Fuente</h3>
        
        {/* Slider para Ancho (wdth) */}
        <label htmlFor="wdth-slider" style={{ display: 'block', marginBottom: '10px' }}>
          Ancho (wdth)
          <input
            type="range"
            min="0" // Define el rango mínimo de tu fuente
            max="100" // Define el rango máximo de tu fuente
            defaultValue={wdthRef.current} // Usa defaultValue para el valor inicial
            onChange={handleWdthChange}
            style={{ width: '100%', display: 'block', marginTop: '5px' }}
          />
        </label>

        {/* Slider para Peso (wght) */}
        <label htmlFor="wght-slider" style={{ display: 'block', marginBottom: '10px' }}>
          Peso (wght)
          <input
            type="range"
            min="0" // Define el rango mínimo de tu fuente
            max="100" // Define el rango máximo de tu fuente
            defaultValue={wghtRef.current} // Usa defaultValue para el valor inicial
            onChange={handleWghtChange}
            style={{ width: '100%', display: 'block', marginTop: '5px' }}
          />
        </label>
      </div>
    </div>
  )
}

export default FontSettings