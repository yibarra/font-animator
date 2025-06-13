// convert Uint8Array to a base64 string for @font-face injection
export const Uint8ToString = (u8a: Uint8Array): string => {
  const CHUNK_SIZE = 8192 // chunk size for apply performance
  let result = ''

  for (let i = 0; i < u8a.length; i += CHUNK_SIZE) {
    const chunk = u8a.subarray(i, Math.min(i + CHUNK_SIZE, u8a.length))
    result += String.fromCharCode.apply(null, Array.from(chunk))
  }

  return window.btoa(result)
}

// injects or updates @font-face rule in document head
export const setFontFace = (fontBuffer: Uint8Array, name: string): void => {
  const base = Uint8ToString(fontBuffer)
  const fontFace: string = `@font-face {
    font-family: '${name}'
    src: url('data:font/truetype;base64,${base}') format('truetype')
    font-display: swap /* Prevent invisible text during load */
  }`

  let style = document.getElementById('font-load') as HTMLStyleElement

  if (!style) {
    style = document.createElement('style')
    style.id = 'font-load'
    
    document.head.appendChild(style)
  }

  style.textContent = fontFace
}
