// get current
export const getUrlParam = (key: string) => {
  const params = new URLSearchParams(window.location.search)
  
  return params.get(key) ?? ''
}

// percent range
export const percentToRange = (percent: number, start: number, end: number) => {
  const normalizedPercent = Math.max(0, Math.min(100, percent)) / 100
  return start + (end - start) * normalizedPercent
}

// get font variation
export const getFontVariation = (axes: Record<string, unknown>, coord: number[]): string => {
  if (!axes || !coord || coord.length === 0) {
    return ''
  }

  const axesNames = Object.keys(axes)
  const settings: string[] = []

  for (let i = 0; i < axesNames.length && i < coord.length; i++) {
    settings.push(`'${axesNames[i]}' ${coord[i]}`)
  }

  return settings.join(', ')
}