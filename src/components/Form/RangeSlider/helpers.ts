export const formatValue = (value: number) => {
  const strValue = Math.abs(Number(String(value).padStart(2, '0')))

  return {
    sign: Math.sign(value) === -1 ? '-' : '+',
    value: strValue
  }
}